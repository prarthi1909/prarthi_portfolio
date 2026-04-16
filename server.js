/* ============================================
   PORTFOLIO BACKEND — Express + Nodemailer + Analytics
   Contact form email service & visitor tracking
   ============================================ */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// ---- Middleware ----
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));


// ============================================
//  ANALYTICS — File-based visitor tracking
// ============================================

const ANALYTICS_FILE = path.join(__dirname, 'analytics-data.json');

// Default analytics structure
function getDefaultData() {
    return {
        totalVisits: 0,
        uniqueVisitors: 0,
        visitors: {},     // IP-based unique tracking
        sectionViews: {
            hero: 0,
            about: 0,
            education: 0,
            skills: 0,
            projects: 0,
            achievements: 0,
            experience: 0,
            contact: 0
        },
        dailyVisits: {},   // { "2026-04-11": 5 }
        recentVisits: []   // last 50 visit records
    };
}

// Read analytics data from file
function readAnalytics() {
    try {
        if (fs.existsSync(ANALYTICS_FILE)) {
            const raw = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
            const data = JSON.parse(raw);
            // Ensure structure integrity
            return { ...getDefaultData(), ...data };
        }
    } catch (err) {
        console.error('⚠️  Error reading analytics file:', err.message);
    }
    return getDefaultData();
}

// Write analytics data to file
function writeAnalytics(data) {
    try {
        fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error('⚠️  Error writing analytics file:', err.message);
    }
}

// Get visitor IP (handles proxies)
function getVisitorIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
           req.connection?.remoteAddress ||
           req.socket?.remoteAddress ||
           'unknown';
}

// ---- POST /api/analytics/visit — Record a page visit ----
app.post('/api/analytics/visit', (req, res) => {
    const data = readAnalytics();
    const ip = getVisitorIP(req);
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    // Total visits
    data.totalVisits++;

    // Unique visitors (by IP)
    if (!data.visitors[ip]) {
        data.visitors[ip] = { firstVisit: now, visits: 0 };
        data.uniqueVisitors++;
    }
    data.visitors[ip].visits++;
    data.visitors[ip].lastVisit = now;

    // Daily visits
    data.dailyVisits[today] = (data.dailyVisits[today] || 0) + 1;

    // Recent visits (keep last 50)
    data.recentVisits.unshift({
        ip: ip.replace(/\d+$/, '***'),  // Partially mask IP for privacy
        timestamp: now,
        userAgent: (req.headers['user-agent'] || '').substring(0, 120)
    });
    if (data.recentVisits.length > 50) {
        data.recentVisits = data.recentVisits.slice(0, 50);
    }

    writeAnalytics(data);
    res.json({ success: true });
});

// ---- POST /api/analytics/section — Record a section view ----
app.post('/api/analytics/section', (req, res) => {
    const { section } = req.body;
    if (!section) return res.status(400).json({ success: false });

    const data = readAnalytics();
    const key = section.toLowerCase();

    if (data.sectionViews.hasOwnProperty(key)) {
        data.sectionViews[key]++;
    } else {
        data.sectionViews[key] = 1;
    }

    writeAnalytics(data);
    res.json({ success: true });
});

// ---- GET /api/analytics — Return analytics data (for dashboard) ----
app.get('/api/analytics', (req, res) => {
    const data = readAnalytics();

    // Return sanitized data (no raw IPs)
    res.json({
        totalVisits: data.totalVisits,
        uniqueVisitors: data.uniqueVisitors,
        sectionViews: data.sectionViews,
        dailyVisits: data.dailyVisits,
        recentVisits: data.recentVisits
    });
});

// ---- GET /api/analytics/reset — Reset analytics (admin) ----
app.post('/api/analytics/reset', (req, res) => {
    writeAnalytics(getDefaultData());
    console.log('🔄 Analytics data reset');
    res.json({ success: true, message: 'Analytics data has been reset.' });
});


// ============================================
//  AI CHATBOT — OpenAI Integration (Optional)
// ============================================

app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(503).json({
            success: false,
            message: 'AI service not configured. Using local responses.'
        });
    }

    const systemPrompt = `You are PK Assistant, a friendly and professional chatbot embedded in Prarthi Kumari's portfolio website. 

About Prarthi:
- Computer Science B.Tech student (2022-2026) at LNCT Group of Colleges, Bhopal, India
- Skills: Java, C++, JavaScript, HTML5, CSS3, Bootstrap, Node.js, Express.js, MongoDB, DSA, OOP, DBMS
- Experience: Java Full Stack Developer at Wipro, Cybersecurity Intern at Eduskill, Springboard Training at Infosys
- Projects: Urban Waste Management System, Student Identification System, Zoo Management System, Instagram Clone UI
- Achievements: 4★ HackerRank (Problem Solving & Java), Top 1% CoCubes National Assessment 2025, NPTEL Certified in Java
- Contact: Prarthikumari0101@gmail.com, GitHub: prarthi1909
- She's open to internships, full-time roles, and collaboration opportunities

Rules:
- Keep responses concise (2-4 sentences max)
- Be friendly, professional, and helpful
- Always relate answers back to Prarthi's skills, projects, or portfolio when possible
- If asked about something unrelated, politely redirect to portfolio topics
- Use emojis sparingly for a friendly tone
- Do NOT make up information about Prarthi — only use the facts provided above`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...(history || []).map(h => ({ role: 'user', content: h })),
                    { role: 'user', content: message }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content?.trim();

        if (reply) {
            res.json({ success: true, reply });
        } else {
            throw new Error('No reply generated');
        }
    } catch (error) {
        console.error('❌ OpenAI API error:', error.message);
        res.status(500).json({
            success: false,
            message: 'AI service temporarily unavailable.'
        });
    }
});


// ============================================
//  CONTACT FORM — Nodemailer
// ============================================

// ---- Nodemailer Transporter ----
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Verify transporter on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Email transporter error:', error.message);
        console.log('\n⚠️  Make sure you have set GMAIL_USER and GMAIL_PASS in your .env file.');
        console.log('   GMAIL_PASS should be a Gmail App Password, not your regular password.');
        console.log('   Generate one at: https://myaccount.google.com/apppasswords\n');
    } else {
        console.log('✅ Email transporter is ready to send messages');
    }
});

// ---- POST /send-message ----
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required (name, email, message).'
        });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    // Compose email
    const mailOptions = {
        from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
        to: 'prarthikumari0101@gmail.com',
        replyTo: email,
        subject: `New Message from ${name}`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a1a; border-radius: 12px; overflow: hidden; border: 1px solid #1a1a3a;">
                <div style="background: linear-gradient(135deg, #7c3aed, #3b82f6); padding: 24px 32px;">
                    <h2 style="color: #ffffff; margin: 0; font-size: 20px;">📩 New Portfolio Message</h2>
                </div>
                <div style="padding: 32px;">
                    <div style="margin-bottom: 20px; padding: 16px; background: rgba(124,58,237,0.08); border-radius: 8px; border-left: 3px solid #7c3aed;">
                        <p style="margin: 0 0 4px; font-size: 12px; color: #a0a0c0; text-transform: uppercase; letter-spacing: 1px;">From</p>
                        <p style="margin: 0; font-size: 16px; color: #e8e8f0; font-weight: 600;">${name}</p>
                    </div>
                    <div style="margin-bottom: 20px; padding: 16px; background: rgba(59,130,246,0.08); border-radius: 8px; border-left: 3px solid #3b82f6;">
                        <p style="margin: 0 0 4px; font-size: 12px; color: #a0a0c0; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                        <p style="margin: 0; font-size: 16px; color: #e8e8f0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
                    </div>
                    <div style="padding: 16px; background: rgba(6,182,212,0.08); border-radius: 8px; border-left: 3px solid #06b6d4;">
                        <p style="margin: 0 0 4px; font-size: 12px; color: #a0a0c0; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                        <p style="margin: 0; font-size: 15px; color: #e8e8f0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
                <div style="padding: 16px 32px; background: rgba(255,255,255,0.02); border-top: 1px solid #1a1a3a; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #6a6a8a;">Sent from your Portfolio Contact Form</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent from ${name} (${email})`);
        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error('❌ Failed to send email:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
        });
    }
});

// ---- Start Server ----
app.listen(PORT, () => {
    console.log(`\n🚀 Portfolio server running at http://localhost:${PORT}`);
    console.log(`📧 Contact form endpoint: POST http://localhost:${PORT}/send-message`);
    console.log(`📊 Analytics dashboard: http://localhost:${PORT}/analytics.html`);
    console.log(`📈 Analytics API: GET http://localhost:${PORT}/api/analytics\n`);
});
