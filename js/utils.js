// 加载导航栏组件
async function loadNavbar() {
    return new Promise(async (resolve, reject) => {
        try {
            // 使用相对路径或动态构建完整路径
            const baseUrl = window.location.origin;
            const response = await fetch(`${baseUrl}/components/navbar.html`);
            if (!response.ok) throw new Error('加载导航栏失败');
            const html = await response.text();
            
            // 将导航栏插入到指定位置
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = html;
                
                // 根据当前页面路径高亮对应的导航链接
                const currentPath = window.location.pathname;
                const navLinks = navbarPlaceholder.querySelectorAll('.nav-links a');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href').includes(currentPath)) {
                        link.classList.add('active');
                    }
                });
                
                resolve(); // 导航栏加载成功
            } else {
                reject(new Error('未找到导航栏占位符'));
            }
        } catch (error) {
            reject(error);
        }
    });
}