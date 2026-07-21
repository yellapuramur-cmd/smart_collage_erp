import os
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether

def create_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'MainTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        textColor=colors.HexColor('#1E3A8A'),
        spaceAfter=4,
        alignment=0
    )

    subtitle_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=colors.HexColor('#2563EB'),
        spaceAfter=15,
        alignment=0
    )

    h2_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        textColor=colors.HexColor('#334155'),
        leading=12
    )

    cell_bold = ParagraphStyle(
        'CellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        textColor=colors.HexColor('#0F172A'),
        leading=11
    )

    cell_normal = ParagraphStyle(
        'CellNormal',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        textColor=colors.HexColor('#334155'),
        leading=11
    )

    cell_mono = ParagraphStyle(
        'CellMono',
        parent=styles['Normal'],
        fontName='Courier-Bold',
        fontSize=8.5,
        textColor=colors.HexColor('#1D4ED8'),
        leading=11
    )

    elements = []

    # Header / Title
    elements.append(Paragraph("🎓 AI-ENABLED SMART COLLEGE ERP SYSTEM", title_style))
    elements.append(Paragraph("OFFICIAL PORTAL LOGIN CREDENTIALS & SYSTEM ACCESS DIRECTORY", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#2563EB'), spaceAfter=12))

    # Access URLs Card
    elements.append(Paragraph("<b>🌐 System Access Endpoints:</b>", h2_style))
    url_data = [
        [Paragraph("<b>Web App Portal (Frontend):</b>", cell_bold), Paragraph("<u>http://localhost:5174</u>", cell_mono)],
        [Paragraph("<b>Backend REST API:</b>", cell_bold), Paragraph("<u>http://localhost:5000/api/v1</u>", cell_mono)],
        [Paragraph("<b>GitHub Repository:</b>", cell_bold), Paragraph("<u>https://github.com/yellapuramur-cmd/smart_collage_erp</u>", cell_mono)]
    ]
    t_url = Table(url_data, colWidths=[2.2*inch, 5.2*inch])
    t_url.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#F8FAFC')),
        ('PADDING', (0, 0), (-1, -1), 6),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#E2E8F0')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    elements.append(t_url)
    elements.append(Spacer(1, 10))

    # Section: Accounts Table
    elements.append(Paragraph("<b>🔑 Pre-Seeded Account Credentials (All Roles):</b>", h2_style))

    table_data = [
        [
            Paragraph("<b>Role</b>", cell_bold),
            Paragraph("<b>Full Name</b>", cell_bold),
            Paragraph("<b>Email Address (Login ID)</b>", cell_bold),
            Paragraph("<b>Password</b>", cell_bold),
            Paragraph("<b>Department / Course</b>", cell_bold),
            Paragraph("<b>Portal Privileges</b>", cell_bold)
        ],
        # Admin
        [
            Paragraph("<b>ADMIN</b>", ParagraphStyle('AdminRole', parent=cell_bold, textColor=colors.HexColor('#DC2626'))),
            Paragraph("System Admin", cell_bold),
            Paragraph("admin@erp.com", cell_mono),
            Paragraph("admin123", cell_mono),
            Paragraph("System Wide", cell_normal),
            Paragraph("Full Admin Suite, Create Users, Timetable, Analytics", cell_normal)
        ],
        # Faculty 1
        [
            Paragraph("<b>FACULTY</b>", ParagraphStyle('FacRole', parent=cell_bold, textColor=colors.HexColor('#7C3AED'))),
            Paragraph("Dr. Ramesh Chander", cell_bold),
            Paragraph("ramesh@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("CSE (HOD)", cell_normal),
            Paragraph("Mark Attendance, Upload Marks, Study Notes", cell_normal)
        ],
        # Faculty 2
        [
            Paragraph("<b>FACULTY</b>", ParagraphStyle('FacRole', parent=cell_bold, textColor=colors.HexColor('#7C3AED'))),
            Paragraph("Dr. Sunita Kulkarni", cell_bold),
            Paragraph("sunita@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("ECE (Professor)", cell_normal),
            Paragraph("Electronics Attendance, Marks & Schedule", cell_normal)
        ],
        # Faculty 3
        [
            Paragraph("<b>FACULTY</b>", ParagraphStyle('FacRole', parent=cell_bold, textColor=colors.HexColor('#7C3AED'))),
            Paragraph("Prof. Rajesh Kumar", cell_bold),
            Paragraph("rajesh@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("IT (Assoc. Prof)", cell_normal),
            Paragraph("IT Lectures, Notes Upload & Grading", cell_normal)
        ],
        # Faculty 4
        [
            Paragraph("<b>FACULTY</b>", ParagraphStyle('FacRole', parent=cell_bold, textColor=colors.HexColor('#7C3AED'))),
            Paragraph("Dr. Meenakshi Sundaram", cell_bold),
            Paragraph("meenakshi@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("CSE (Asst. Prof)", cell_normal),
            Paragraph("OS & Cybersecurity Lectures", cell_normal)
        ],
        # Student 1
        [
            Paragraph("<b>STUDENT</b>", ParagraphStyle('StuRole', parent=cell_bold, textColor=colors.HexColor('#059669'))),
            Paragraph("Aarav Sharma", cell_bold),
            Paragraph("aarav@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("B.Tech CSE (Sem 3)", cell_normal),
            Paragraph("Dashboard, Attendance, Marks, Submissions", cell_normal)
        ],
        # Student 2
        [
            Paragraph("<b>STUDENT</b>", ParagraphStyle('StuRole', parent=cell_bold, textColor=colors.HexColor('#059669'))),
            Paragraph("Ananya Iyer", cell_bold),
            Paragraph("ananya@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("B.Tech CSE (Sem 3)", cell_normal),
            Paragraph("Transcripts, Schedules & Notes Downloads", cell_normal)
        ],
        # Student 3
        [
            Paragraph("<b>STUDENT</b>", ParagraphStyle('StuRole', parent=cell_bold, textColor=colors.HexColor('#059669'))),
            Paragraph("Rohan Gupta", cell_bold),
            Paragraph("rohan@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("B.Tech CSE (Sem 3)", cell_normal),
            Paragraph("Student Portal & Fee Payment Receipts", cell_normal)
        ],
        # Student 4
        [
            Paragraph("<b>STUDENT</b>", ParagraphStyle('StuRole', parent=cell_bold, textColor=colors.HexColor('#059669'))),
            Paragraph("Priya Nair", cell_bold),
            Paragraph("priya@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("B.Tech IT (Sem 3)", cell_normal),
            Paragraph("IT Dashboard & Subject Materials", cell_normal)
        ],
        # Student 5
        [
            Paragraph("<b>STUDENT</b>", ParagraphStyle('StuRole', parent=cell_bold, textColor=colors.HexColor('#059669'))),
            Paragraph("Vikram Malhotra", cell_bold),
            Paragraph("vikram@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("B.Tech IT (Sem 3)", cell_normal),
            Paragraph("Student Assignments & Fee Management", cell_normal)
        ],
        # Student 6
        [
            Paragraph("<b>STUDENT</b>", ParagraphStyle('StuRole', parent=cell_bold, textColor=colors.HexColor('#059669'))),
            Paragraph("Ishita Patel", cell_bold),
            Paragraph("ishita@erp.com", cell_mono),
            Paragraph("password123", cell_mono),
            Paragraph("B.Tech ECE (Sem 3)", cell_normal),
            Paragraph("ECE Student Portal & Class Schedule", cell_normal)
        ]
    ]

    t_accounts = Table(table_data, colWidths=[0.8*inch, 1.4*inch, 1.6*inch, 1.0*inch, 1.3*inch, 1.3*inch])
    t_accounts.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1E293B')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 5),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')]),
    ]))

    elements.append(t_accounts)
    elements.append(Spacer(1, 12))

    # Section: Creating New Users as Admin
    elements.append(Paragraph("<b>➕ How Admin Can Create New Student & Faculty Accounts:</b>", h2_style))
    instructions_text = """
    1. Log in as <b>Admin</b> (<code>admin@erp.com</code> / <code>admin123</code>).<br/>
    2. Click <b>Students Management</b> or <b>Faculty Management</b> in the sidebar navigation.<br/>
    3. Click <b>+ Add New Student</b> or <b>+ Add New Faculty</b>.<br/>
    4. Fill in the Full Name, Email, and <b>Login Password</b>.<br/>
    5. Click <b>Create Account</b> ➔ The user profile AND their login credentials are saved live to MongoDB.<br/>
    6. The newly created student or faculty member can immediately sign in at <u>http://localhost:5174/login</u>.
    """
    elements.append(Paragraph(instructions_text, body_style))
    elements.append(Spacer(1, 10))

    # Section: How to Run in VS Code
    elements.append(Paragraph("<b>💻 How to Run the Application in VS Code:</b>", h2_style))
    run_text = """
    <b>1. Open Folder in VS Code:</b> File ➔ Open Folder ➔ <code>c:\\Users\\admin\\OneDrive\\Desktop\\collage</code><br/>
    <b>2. Start Backend Server:</b> Open Terminal ➔ <code>cd server</code> ➔ <code>node index.js</code> (Port 5000)<br/>
    <b>3. Start Frontend Client:</b> Open 2nd Terminal ➔ <code>cd client</code> ➔ <code>npm run dev</code> (Port 5174)<br/>
    <b>4. Open Browser:</b> Navigate to <u>http://localhost:5174</u>
    """
    elements.append(Paragraph(run_text, body_style))

    # Build Document
    doc.build(elements)
    print(f"SUCCESS: PDF created at {filename}")

if __name__ == '__main__':
    target_path = r"c:\Users\admin\OneDrive\Desktop\collage\SMART_COLLEGE_ERP_LOGIN_CREDENTIALS.pdf"
    create_pdf(target_path)
