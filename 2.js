function changePage(page) {
    showLoading();
    setTimeout(() => {
        const content = document.getElementById('pageContent');
        const navButtons = document.querySelectorAll('nav button');
        navButtons.forEach(btn => btn.classList.remove('active-nav'));
        document.querySelector(`nav button[onclick="changePage('${page}')"]`).classList.add('active-nav');

        switch(page) {
            case 'dashboard':
                const deviceInfo = getDeviceInfo();
                content.innerHTML = `
                <h2 class="dashboard-title">OEM Dashboard</h2>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Device Health -->
                    <div class="device-health p-6 lg:col-span-1">
                        <h3 class="text-xl font-semibold mb-4">Device Health</h3>
                        <!-- ... (rest of the device health info) ... -->
                    </div>
                    <!-- Vulnerability Overview -->
                    <div class="bg-gray-800 p-6 rounded-lg lg:col-span-2">
                        <h3 class="text-xl font-semibold mb-4">Vulnerability Overview</h3>
                        <div class="chart-container" style="height: 300px;">
                            <canvas id="vulnChart"></canvas>
                        </div>
                    </div>
                </div>
                <!-- ... (rest of the dashboard content) ... -->
                `;
                initCharts();
                init3DScene();
                updateDynamicInfo();
                break;

            // ... (other cases remain the same) ...
        }
    }, 500);
}

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

    // ... (other charts remain the same)

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
            },
            aspectRatio: 2 // Adjust this value to control the size
        }
    });

    // ... (other charts remain the same)
}