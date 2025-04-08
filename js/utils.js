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
                
                // 获取所有导航链接，包括下拉菜单中的链接
                const navLinks = navbarPlaceholder.querySelectorAll('.nav-links a');
                const dropdownLinks = navbarPlaceholder.querySelectorAll('.dropdown-menu a');
                
                // 处理主导航链接
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && href.includes(currentPath)) {
                        link.classList.add('active');
                    }
                });
                
                // 处理下拉菜单链接
                let activeDropdown = false;
                dropdownLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && href.includes(currentPath)) {
                        link.classList.add('active');
                        activeDropdown = true;
                        
                        // 找到父级下拉菜单并高亮
                        const parentDropdown = link.closest('.dropdown');
                        if (parentDropdown) {
                            const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
                            if (dropdownToggle) {
                                dropdownToggle.classList.add('active');
                            }
                        }
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