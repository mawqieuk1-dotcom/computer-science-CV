const translations = {
    ar: {
        page_title: 'عبدالله الكندري | طالب علوم حاسب',
        brand_name: 'عبدالله الكندري',
        nav_home: 'الرئيسية', nav_projects: 'مشاريع', nav_tech: 'تقنيات', nav_github: 'GitHub', nav_contact: 'تواصل',
        hero_badge: 'طالب علوم حاسب', hero_hello: 'مرحباً، أنا', hero_name: 'عبدالله الكندري',
        hero_desc: 'مطور واجهات أمامية شغوف، أدرس في جامعة الكويت. أحب بناء تطبيقات ويب تفاعلية باستخدام React و Node.js.',
        hero_btn1: 'شاهد مشاريعي', hero_btn2: 'تواصل معي',
        stat_projects: 'مشروع', stat_commits: 'Commit', stat_langs: 'لغة برمجة',
        projects_title: 'مشاريعي البرمجية', projects_sub: 'آخر المشاريع التي قمت ببنائها',
        proj1_title: 'نظام إدارة مستشفى', proj1_desc: 'تطبيق ويب متكامل لإدارة مواعيد المرضى.',
        proj2_title: 'موقع عيادة أسنان', proj2_desc: 'موقع احترافي مع نظام حجز مواعيد.',
        proj3_title: 'تطبيق طقس', proj3_desc: 'تطبيق يعرض حالة الطقس باستخدام API.',
        proj_github: 'GitHub',
        tech_title: 'التقنيات التي أتقنها', tech_sub: 'لغات البرمجة والأدوات',
        github_title: 'مساهماتي على GitHub', github_sub: 'آخر نشاطاتي في المصادر المفتوحة',
        gh1_title: 'مشروع إدارة المهام', gh1_desc: 'تطبيق مفتوح المصدر لإدارة المهام اليومية.',
        gh2_title: 'مكتبة React للواجهات', gh2_desc: 'مكتبة مكونات جاهزة لتسريع تطوير الواجهات.',
        contact_title: 'تواصل معي', contact_sub: 'للاستفسار أو التعاون في مشاريع',
        form_name: 'الاسم', form_email: 'البريد الإلكتروني', form_msg: 'الرسالة', form_submit: 'إرسال',
        copyright: '© 2025 عبدالله الكندري. قالب من <strong>موقعك</strong> – Mawqeak'
    },
    en: {
        page_title: 'Abdullah Al-Kandari | CS Student',
        brand_name: 'Abdullah Al-Kandari',
        nav_home: 'Home', nav_projects: 'Projects', nav_tech: 'Tech Stack', nav_github: 'GitHub', nav_contact: 'Contact',
        hero_badge: 'CS Student', hero_hello: 'Hi, I am', hero_name: 'Abdullah Al-Kandari',
        hero_desc: 'Passionate front-end developer, studying at Kuwait University. I love building interactive web apps with React & Node.js.',
        hero_btn1: 'View My Projects', hero_btn2: 'Contact Me',
        stat_projects: 'Projects', stat_commits: 'Commits', stat_langs: 'Languages',
        projects_title: 'My Projects', projects_sub: 'Recent projects I have built',
        proj1_title: 'Hospital Management System', proj1_desc: 'A full-stack web app for managing patient appointments.',
        proj2_title: 'Dental Clinic Website', proj2_desc: 'Professional website with appointment booking system.',
        proj3_title: 'Weather App', proj3_desc: 'A weather application using external API.',
        proj_github: 'GitHub',
        tech_title: 'Tech Stack', tech_sub: 'Programming languages & tools',
        github_title: 'My GitHub', github_sub: 'Latest open-source contributions',
        gh1_title: 'Task Manager Project', gh1_desc: 'Open-source daily task management application.',
        gh2_title: 'React UI Library', gh2_desc: 'A collection of ready-to-use components to speed up UI development.',
        contact_title: 'Contact Me', contact_sub: 'For inquiries or project collaboration',
        form_name: 'Name', form_email: 'Email', form_msg: 'Message', form_submit: 'Send',
        copyright: '© 2025 Abdullah Al-Kandari. Template by <strong>Mawqeak</strong>'
    }
};

let currentLang = 'ar';
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    const btn = document.getElementById('langToggle');
    if (btn) btn.innerHTML = lang === 'ar' ? '<i class="fas fa-globe"></i> English' : '<i class="fas fa-globe"></i> العربية';
    localStorage.setItem('lang', lang);
}
function switchLanguage() { setLanguage(currentLang === 'ar' ? 'en' : 'ar'); }
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(localStorage.getItem('lang') || 'ar');
    document.getElementById('langToggle')?.addEventListener('click', switchLanguage);
});