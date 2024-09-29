 // Loader script
 const loader = document.getElementById('loader');
 const mainContent = document.getElementById('main-content');

 function createLoader() {
     const scene = new THREE.Scene();
     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
     const renderer = new THREE.WebGLRenderer();
     renderer.setSize(window.innerWidth, window.innerHeight);
     loader.appendChild(renderer.domElement);

     const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
     const material = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true });
     const torusKnot = new THREE.Mesh(geometry, material);
     scene.add(torusKnot);

     camera.position.z = 30;

     const animate = function () {
         requestAnimationFrame(animate);
         torusKnot.rotation.x += 0.01;
         torusKnot.rotation.y += 0.01;
         renderer.render(scene, camera);
     };

     animate();

     setTimeout(() => {
         loader.style.display = 'none';
         mainContent.classList.remove('hidden');
         changePage('dashboard'); // Open dashboard immediately after loader
     }, 3000);
 }

 createLoader();

 function changePage(page) {
     const content = document.getElementById('pageContent');
     const navButtons = document.querySelectorAll('nav button');
     navButtons.forEach(btn => btn.classList.remove('active-nav'));
     event.target.classList.add('active-nav');

     switch(page) {
         case 'dashboard':
             content.innerHTML = `
                 <h2 class="text-2xl font-semibold mb-6">Dashboard</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <!-- Device Health -->
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Device Health</h3>
                         <p class="mb-2">Device: Acer Extensa 215</p>
                         <p class="mb-2">OS: Windows 11 Personal</p>
                         <p class="mb-4">Status: <span class="text-green-500">Secured</span></p>
                         <div class="bg-gray-700 p-4 rounded-lg">
                             <h4 class="font-semibold mb-2">Automatic Vulnerability Scan Results:</h4>
                             <ul class="list-disc list-inside">
                                 <li>No critical vulnerabilities detected</li>
                                 <li>2 software updates recommended</li>
                                 <li>Firewall active and configured correctly</li>
                             </ul>
                         </div>
                         <p class="mt-4 text-green-500 font-semibold">THIS DEVICE IS AUTOMATICALLY VERIFIED & SECURED</p>
                     </div>
                     <!-- Vulnerability Overview -->
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Vulnerability Overview</h3>
                         <div class="chart-container">
                             <canvas id="vulnChart"></canvas>
                         </div>
                     </div>
                 </div>
                 <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <!-- Vendor Distribution -->
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Vendor Distribution</h3>
                         <div class="chart-container">
                             <canvas id="vendorChart"></canvas>
                         </div>
                     </div>
                     <!-- 3D Network Topology -->
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Network Topology</h3>
                         <div id="3d-container" class="w-full h-64"></div>
                     </div>
                 </div>
                 <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <!-- Threat Intelligence Feed -->
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Threat Intelligence Feed</h3>
                         <ul class="space-y-2">
                             <li class="flex items-center"><span class="w-3 h-3 bg-red-500 rounded-full mr-2"></span> New ransomware variant detected in wild</li>
                             <li class="flex items-center"><span class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span> Potential zero-day vulnerability in popular CMS</li>
                             <li class="flex items-center"><span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Latest security patches available for Windows OS</li>
                         </ul>
                     </div>
                     <!-- System Performance -->
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">System Performance</h3>
                         <div class="chart-container">
                             <canvas id="performanceChart"></canvas>
                         </div>
                     </div>
                 </div>
             `;
             initCharts();
             init3DScene();
             break;
         case 'vulnerabilities':
             content.innerHTML = `
                 <h2 class="text-2xl font-semibold mb-6">Vulnerabilities</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Recent Vulnerabilities</h3>
                         <ul class="space-y-4">
                             <li class="p-4 bg-gray-700 rounded-lg">
                                 <h4 class="font-semibold">SQL Injection in Web Portal</h4>
                                 <p class="text-sm text-gray-400">Severity: High</p>
                                 <p class="text-sm text-gray-400">Status: <span class="text-green-500">Fixed</span></p>
                                 <p class="mt-2">Affected systems: 3</p>
                                 <p>Potential impact: Data breach, unauthorized access</p>
                             </li>
                             <li class="p-4 bg-gray-700 rounded-lg">
                                 <h4 class="font-semibold">Cross-Site Scripting in User Profile</h4>
                                 <p class="text-sm text-gray-400">Severity: Medium</p>
                                 <p class="text-sm text-gray-400">Status: <span class="text-yellow-500">In Progress</span></p>
                                 <p class="mt-2">Affected systems: 2</p>
                                 <p>Potential impact: Session hijacking, malicious script injection</p>
                             </li>
                             <li class="p-4 bg-gray-700 rounded-lg">
                                 <h4 class="font-semibold">Outdated SSL/TLS Version</h4>
                                 <p class="text-sm text-gray-400">Severity: Medium</p>
                                 <p class="text-sm text-gray-400">Status: <span class="text-red-500">Open</span></p>
                                 <p class="mt-2">Affected systems: 5</p>
                                 <p>Potential impact: Man-in-the-middle attacks, data interception</p>
                             </li>
                         </ul>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Vulnerability Trends</h3>
                         <div class="chart-container">
                             <canvas id="trendChart"></canvas>
                         </div>
                     </div>
                 </div>
                 <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Top Vulnerable Assets</h3>
                         <ul class="space-y-2">
                             <li class="flex justify-between items-center">
                                 <span>Web Server 1</span>
                                 <span class="px-2 py-1 bg-red-500 rounded">High Risk</span>
                             </li>
                             <li class="flex justify-between items-center">
                                 <span>Database Server</span>
                                 <span class="px-2 py-1 bg-yellow-500 rounded">Medium Risk</span>
                             </li>
                             <li class="flex justify-between items-center">
                                 <span>Employee Workstation 5</span>
                                 <span class="px-2 py-1 bg-yellow-500 rounded">Medium Risk</span>
                             </li>
                             <li class="flex justify-between items-center">
                                 <span>File Server</span>
                                 <span class="px-2 py-1 bg-green-500 rounded">Low Risk</span>
                             </li>
                         </ul>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Vulnerability Age Distribution</h3>
                         <div class="chart-container">
                             <canvas id="vulnAgeChart"></canvas>
                         </div>
                     </div>
                 </div>
             `;
             initVulnerabilityCharts();
             break;
         case 'vendors':
             content.innerHTML = `
                 <h2 class="text-2xl font-semibold mb-6">Vendors and Products</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Top Vendors</h3>
                         <ul class="space-y-2">
                             <li class="flex justify-between items-center">
                                 <span>Microsoft</span>
                                 <span class="text-blue-500">35 products</span>
                             </li>
                             <li class="flex justify-between items-center">
                                 <span>Cisco</span>
                                 <span class="text-blue-500">28 products</span>
                             </li>
                             <li class="flex justify-between items-center">
                                 <span>Oracle</span>
                                 <span class="text-blue-500">22 products</span>
                             </li>
                             <li class="flex justify-between items-center">
                                 <span>IBM</span>
                                 <span class="text-blue-500">18 products</span>
                             </li>
                             <li class="flex justify-between items-center">
                                 <span>VMware</span>
                                 <span class="text-blue-500">15 products</span>
                             </li>
                         </ul>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Product Categories</h3>
                         <div class="chart-container">
                             <canvas id="categoryChart"></canvas>
                         </div>
                     </div>
                 </div>
                 <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Recent Product Updates</h3>
                         <ul class="space-y-2">
                             <li class="p-2 bg-gray-700 rounded">
                                 <span class="font-semibold">Windows Server 2019</span> - Security patch KB5005030
                             </li>
                             <li class="p-2 bg-gray-700 rounded">
                                 <span class="font-semibold">Cisco IOS XE</span> - Version 17.3.3 release
                             </li>
                             <li class="p-2 bg-gray-700 rounded">
                                 <span class="font-semibold">Oracle Database</span> - Critical patch update (CPU) July 2023
                             </li>
                         </ul>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Product Lifecycle Status</h3>
                         <div class="chart-container">
                             <canvas id="lifecycleChart"></canvas>
                         </div>
                     </div>
                 </div>
             `;
             initVendorCharts();
             break;
         case 'solutions':
             content.innerHTML = `
                 <h2 class="text-2xl font-semibold mb-6">Step-by-Step Solutions</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">SQL Injection Fix</h3>
                         <ol class="list-decimal list-inside space-y-2">
                             <li>Update web application framework to latest version</li>
                             <li>Implement input validation on all user inputs</li>
                             <li>Use parameterized queries for all database operations</li>
                             <li>Apply principle of least privilege to database user</li>
                             <li>Enable web application firewall with SQL injection rules</li>
                             <li>Conduct thorough testing of all input fields</li>
                             <li>Implement regular security audits and penetration testing</li>
                         </ol>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Cross-Site Scripting (XSS) Prevention</h3>
                         <ol class="list-decimal list-inside space-y-2">
                             <li>Sanitize all user inputs</li>
                             <li>Implement Content Security Policy (CSP)</li>
                             <li>Use HttpOnly flag for cookies</li>
                             <li>Encode output on all dynamic content</li>
                             <li>Regularly update and patch all web applications</li>
                             <li>Implement XSS filters on both client and server side</li>
                             <li>Use secure coding practices and conduct code reviews</li>
                         </ol>
                     </div>
                 </div>
                 <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Outdated SSL/TLS Remediation</h3>
                         <ol class="list-decimal list-inside space-y-2">
                             <li>Identify all systems using outdated SSL/TLS versions</li>
                             <li>Plan a phased upgrade to TLS 1.2 or 1.3</li>
                             <li>Update server configurations to disable older protocols</li>
                             <li>Upgrade client applications to support newer TLS versions</li>
                             <li>Implement perfect forward secrecy (PFS) with ECDHE</li>
                             <li>Configure strong cipher suites</li>
                             <li>Conduct thorough testing after upgrades</li>
                         </ol>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Solution Effectiveness</h3>
                         <div class="chart-container">
                             <canvas id="solutionEffectivenessChart"></canvas>
                         </div>
                     </div>
                 </div>
             `;
             initSolutionCharts();
             break;
         case 'alerts':
             content.innerHTML = `
                 <h2 class="text-2xl font-semibold mb-6">Real-Time Alerts</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Configure Alerts</h3>
                         <form id="alertForm" class="space-y-4">
                             <div>
                                 <label class="block mb-2">Name</label>
                                 <input type="text" name="name" class="w-full bg-gray-700 p-2 rounded" required>
                             </div>
                             <div>
                                 <label class="block mb-2">Email</label>
                                 <input type="email" name="email" class="w-full bg-gray-700 p-2 rounded" required>
                             </div>
                             <div>
                                 <label class="block mb-2">Phone Number (for SMS alerts)</label>
                                 <input type="tel" name="phone" class="w-full bg-gray-700 p-2 rounded" required>
                             </div>
                             <div>
                                 <label class="block mb-2">Alert Preferences</label>
                                 <select name="alertType" class="w-full bg-gray-700 p-2 rounded">
                                     <option value="all">All Alerts</option>
                                     <option value="critical">Critical Alerts Only</option>
                                     <option value="custom">Custom</option>
                                 </select>
                             </div>
                             <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Alert Preferences</button>
                         </form>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Recent Alerts</h3>
                         <ul class="space-y-2">
                             <li class="p-2 bg-red-500 bg-opacity-25 rounded">
                                 <span class="font-semibold">Critical:</span> Potential data breach detected
                             </li>
                             <li class="p-2 bg-yellow-500 bg-opacity-25 rounded">
                                 <span class="font-semibold">Warning:</span> Unusual login activity on Server 2
                             </li>
                             <li class="p-2 bg-green-500 bg-opacity-25 rounded">
                                 <span class="font-semibold">Info:</span> System update completed successfully
                             </li>
                         </ul>
                     </div>
                 </div>
                 <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Alert History</h3>
                         <div class="chart-container">
                             <canvas id="alertHistoryChart"></canvas>
                         </div>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Alert Response Time</h3>
                         <div class="chart-container">
                             <canvas id="responseTimeChart"></canvas>
                         </div>
                     </div>
                 </div>
             `;
             initAlertCharts();
             document.getElementById('alertForm').addEventListener('submit', function(e) {
                 e.preventDefault();
                 alert('Alert preferences saved! Integration with notification services would be implemented here.');
             });
             break;
         case 'settings':
             content.innerHTML = `
                 <h2 class="text-2xl font-semibold mb-6">Settings</h2>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Notification Preferences</h3>
                         <form id="notificationForm" class="space-y-4">
                             <div>
                                 <label class="block mb-2">
                                     <input type="checkbox" name="emailNotif" class="mr-2">
                                     Email Notifications
                                 </label>
                                 <input type="email" placeholder="Enter your email" class="w-full bg-gray-700 p-2 rounded">
                             </div>
                             <div>
                                 <label class="block mb-2">
                                     <input type="checkbox" name="smsNotif" class="mr-2">
                                     SMS Notifications
                                 </label>
                                 <input type="tel" placeholder="Enter your phone number" class="w-full bg-gray-700 p-2 rounded">
                             </div>
                             <div>
                                 <label class="block mb-2">
                                     <input type="checkbox" name="pushNotif" class="mr-2">
                                     Push Notifications
                                 </label>
                             </div>
                             <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Preferences</button>
                         </form>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Security Settings</h3>
                         <form id="securityForm" class="space-y-4">
                             <div>
                                 <label class="block mb-2">Two-Factor Authentication</label>
                                 <select name="twoFactor" class="w-full bg-gray-700 p-2 rounded">
                                     <option value="disabled">Disabled</option>
                                     <option value="sms">SMS</option>
                                     <option value="app">Authenticator App</option>
                                 </select>
                             </div>
                             <div>
                                 <label class="block mb-2">Session Timeout (minutes)</label>
                                 <input type="number" name="sessionTimeout" class="w-full bg-gray-700 p-2 rounded" min="5" max="120">
                             </div>
                             <div>
                                 <label class="block mb-2">
                                     <input type="checkbox" name="ipWhitelist" class="mr-2">
                                     Enable IP Whitelisting
                                 </label>
                             </div>
                             <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Security Settings</button>
                         </form>
                     </div>
                 </div>
                 <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">API Keys</h3>
                         <div class="space-y-2">
                             <div class="flex justify-between items-center">
                                 <span>Production API Key</span>
                                 <button class="bg-blue-500 text-white px-2 py-1 rounded text-sm">Regenerate</button>
                             </div>
                             <div class="flex justify-between items-center">
                                 <span>Development API Key</span>
                                 <button class="bg-blue-500 text-white px-2 py-1 rounded text-sm">Regenerate</button>
                             </div>
                         </div>
                     </div>
                     <div class="bg-gray-800 p-6 rounded-lg">
                         <h3 class="text-xl font-semibold mb-4">Theme Settings</h3>
                         <div class="space-y-2">
                             <button class="w-full bg-gray-700 p-2 rounded text-left">Light Mode</button>
                            <button class="w-full bg-blue-500 p-2 rounded text-left">Dark Mode (Current)</button>
             <button class="w-full bg-gray-700 p-2 rounded text-left">System Default</button>
         </div>
     </div>
 </div>
`;
document.getElementById('notificationForm').addEventListener('submit', function(e) {
 e.preventDefault();
 alert('Notification preferences saved!');
});
document.getElementById('securityForm').addEventListener('submit', function(e) {
 e.preventDefault();
 alert('Security settings updated!');
});
break;
     }
 }

 // Modify the initCharts function
 function initCharts() {
     const chartOptions = {
         responsive: true,
         maintainAspectRatio: false,
         plugins: {
             legend: {
                 position: 'bottom',
                 labels: {
                     color: 'white'
                 }
             },
             title: {
                 display: true,
                 color: 'white'
             }
         },
         scales: {
             x: {
                 ticks: { color: 'white' }
             },
             y: {
                 ticks: { color: 'white' }
             }
         }
     };

     new Chart(document.getElementById('vulnChart').getContext('2d'), {
         type: 'doughnut',
         data: {
             labels: ['Critical', 'High', 'Medium', 'Low'],
             datasets: [{
                 data: [4, 8, 15, 25],
                 backgroundColor: ['#DC2626', '#F59E0B', '#10B981', '#3B82F6']
             }]
         },
         options: {
             ...chartOptions,
             plugins: {
                 ...chartOptions.plugins,
                 title: {
                     ...chartOptions.plugins.title,
                     text: 'Vulnerability Severity Distribution'
                 }
             }
         }
     });

     new Chart(document.getElementById('vendorChart').getContext('2d'), {
         type: 'bar',
         data: {
             labels: ['Microsoft', 'Cisco', 'Oracle', 'IBM', 'VMware', 'Others'],
             datasets: [{
                 label: '# of Products',
                 data: [35, 28, 22, 18, 15, 12],
                 backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280']
             }]
         },
         options: {
             ...chartOptions,
             plugins: {
                 ...chartOptions.plugins,
                 legend: {
                     display: false
                 },
                 title: {
                     ...chartOptions.plugins.title,
                     text: 'Product Distribution by Vendor'
                 }
             }
         }
     });

     new Chart(document.getElementById('performanceChart').getContext('2d'), {
         type: 'line',
         data: {
             labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
             datasets: [{
                 label: 'CPU Usage',
                 data: [65, 59, 80, 81, 56, 55, 40, 60, 55, 30],
                 borderColor: '#3B82F6',
                 tension: 0.1
             }, {
                 label: 'Memory Usage',
                 data: [28, 48, 40, 19, 86, 27, 90, 60, 30, 40],
                 borderColor: '#10B981',
                 tension: 0.1
             }]
         },
         options: {
             ...chartOptions,
             plugins: {
                 ...chartOptions.plugins,
                 title: {
                     ...chartOptions.plugins.title,
                     text: 'System Performance'
                 }
             }
         }
     });
 }

 function initVulnerabilityCharts() {
     new Chart(document.getElementById('trendChart').getContext('2d'), {
         type: 'line',
         data: {
             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
             datasets: [{
                 label: 'Vulnerabilities Detected',
                 data: [12, 19, 3, 5, 2, 3],
                 borderColor: '#3B82F6',
                 tension: 0.1
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 title: {
                     display: true,
                     text: 'Vulnerability Trend (Last 6 Months)'
                 }
             }
         }
     });

     new Chart(document.getElementById('vulnAgeChart').getContext('2d'), {
         type: 'pie',
         data: {
             labels: ['0-30 days', '31-60 days', '61-90 days', '90+ days'],
             datasets: [{
                 data: [30, 25, 20, 25],
                 backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#DC2626']
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 title: {
                     display: true,
                     text: 'Vulnerability Age Distribution'
                 }
             }
         }
     });
 }

 function initVendorCharts() {
     new Chart(document.getElementById('categoryChart').getContext('2d'), {
         type: 'pie',
         data: {
             labels: ['Operating Systems', 'Networking', 'Databases', 'Security', 'Others'],
             datasets: [{
                 data: [30, 25, 20, 15, 10],
                 backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280']
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 legend: {
                     position: 'bottom',
                 },
                 title: {
                     display: true,
                     text: 'Product Categories'
                 }
             }
         }
     });

     new Chart(document.getElementById('lifecycleChart').getContext('2d'), {
         type: 'bar',
         data: {
             labels: ['New', 'Mature', 'End of Life'],
             datasets: [{
                 label: 'Number of Products',
                 data: [15, 45, 10],
                 backgroundColor: ['#10B981', '#3B82F6', '#DC2626']
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 legend: {
                     display: false
                 },
                 title: {
                     display: true,
                     text: 'Product Lifecycle Status'
                 }
             }
         }
     });
 }

 function initSolutionCharts() {
     new Chart(document.getElementById('solutionEffectivenessChart').getContext('2d'), {
         type: 'radar',
         data: {
             labels: ['SQL Injection', 'XSS', 'CSRF', 'Outdated SSL/TLS', 'Weak Passwords'],
             datasets: [{
                 label: 'Before',
                 data: [65, 59, 90, 81, 56],
                 fill: true,
                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
                 borderColor: 'rgb(255, 99, 132)',
                 pointBackgroundColor: 'rgb(255, 99, 132)',
                 pointBorderColor: '#fff',
                 pointHoverBackgroundColor: '#fff',
                 pointHoverBorderColor: 'rgb(255, 99, 132)'
             }, {
                 label: 'After',
                 data: [28, 48, 40, 19, 96],
                 fill: true,
                 backgroundColor: 'rgba(54, 162, 235, 0.2)',
                 borderColor: 'rgb(54, 162, 235)',
                 pointBackgroundColor: 'rgb(54, 162, 235)',
                 pointBorderColor: '#fff',
                 pointHoverBackgroundColor: '#fff',
                 pointHoverBorderColor: 'rgb(54, 162, 235)'
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 title: {
                     display: true,
                     text: 'Solution Effectiveness'
                 }
             }
         }
     });
 }

 function initAlertCharts() {
     new Chart(document.getElementById('alertHistoryChart').getContext('2d'), {
         type: 'bar',
         data: {
             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
             datasets: [{
                 label: 'Critical',
                 data: [12, 19, 3, 5, 2, 3],
                 backgroundColor: '#DC2626'
             }, {
                 label: 'Warning',
                 data: [15, 29, 5, 5, 20, 3],
                 backgroundColor: '#F59E0B'
             }, {
                 label: 'Info',
                 data: [20, 35, 40, 39, 50, 30],
                 backgroundColor: '#3B82F6'
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 title: {
                     display: true,
                     text: 'Alert History (Last 6 Months)'
                 }
             },
             scales: {
                 x: {
                     stacked: true,
                 },
                 y: {
                     stacked: true
                 }
             }
         }
     });

     new Chart(document.getElementById('responseTimeChart').getContext('2d'), {
         type: 'line',
         data: {
             labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
             datasets: [{
                 label: 'Average Response Time (minutes)',
                 data: [30, 25, 20, 15, 10, 5],
                 borderColor: '#10B981',
                 tension: 0.1
             }]
         },
         options: {
             responsive: true,
             plugins: {
                 title: {
                     display: true,
                     text: 'Alert Response Time Trend'
                 }
             }
         }
     });
 }

 // 3D Scene
 function init3DScene() {
     const container = document.getElementById('3d-container');
     const scene = new THREE.Scene();
     const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
     const renderer = new THREE.WebGLRenderer();
     renderer.setSize(container.clientWidth, container.clientHeight);
     container.appendChild(renderer.domElement);

     // Create a group to hold all objects
     const group = new THREE.Group();
     scene.add(group);

     // Create multiple interconnected spheres representing network nodes
     const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
     const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x3B82F6});

     const positions = [
         [-2, 0, 0], [2, 0, 0], [0, 2, 0], [0, -2, 0], [0, 0, 2], [0, 0, -2],
         [-1, 1, 1], [1, -1, -1], [-1, -1, 1], [1, 1, -1]
     ];

     const spheres = positions.map(pos => {
         const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
         sphere.position.set(...pos);
         group.add(sphere);
         return sphere;
     });

     // Create lines connecting the spheres
     const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4B5563 });
     for (let i = 0; i < spheres.length; i++) {
         for (let j = i + 1; j < spheres.length; j++) {
             const geometry = new THREE.BufferGeometry().setFromPoints([
                 spheres[i].position,
                 spheres[j].position
             ]);
             const line = new THREE.Line(geometry, lineMaterial);
             group.add(line);
         }
     }

     camera.position.z = 8;

     // Animation
     function animate() {
         requestAnimationFrame(animate);
         group.rotation.x += 0.001;
         group.rotation.y += 0.002;
         renderer.render(scene, camera);
     }
     animate();

     // Resize handler
     window.addEventListener('resize', () => {
         camera.aspect = container.clientWidth / container.clientHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(container.clientWidth, container.clientHeight);
     });
 }
 // Initialize the dashboard on page load
     changePage('dashboard');
 

// Add hover effects to navbar buttons
const navButtons = document.querySelectorAll('nav button');
 navButtons.forEach(button => {
     button.addEventListener('mouseover', () => {
         button.classList.add('bg-blue-600', 'bg-opacity-25');
     });
     button.addEventListener('mouseout', () => {
         button.classList.remove('bg-blue-600', 'bg-opacity-25');
     });
 });

 // Add a pulsing animation to the notification icon
 const notificationIcon = document.querySelector('header i.fa-bell');
 setInterval(() => {
     notificationIcon.classList.add('animate-pulse');
     setTimeout(() => {
         notificationIcon.classList.remove('animate-pulse');
     }, 1000);
 }, 5000);

 // Add a simple loading animation when changing pages
 function showLoading() {
     const content = document.getElementById('pageContent');
     content.innerHTML = '<div class="flex justify-center items-center h-full"><div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>';
 }

 const originalChangePage = changePage;
 changePage = (page) => {
     showLoading();
     setTimeout(() => {
         originalChangePage(page);
     }, 500);
 };