// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hidden');
    }, 2000);

    // Navigation
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const themeToggle = document.querySelector('.theme-toggle');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Expandable chart containers
    const expandableCharts = document.querySelectorAll('.expandable-chart-container');
    
    expandableCharts.forEach(chart => {
        const header = chart.querySelector('.chart-header');
        const content = chart.querySelector('.chart-content');
        const expandBtn = chart.querySelector('.expand-btn');
        
        // Set the first chart as expanded by default
        if (chart === expandableCharts[0]) {
            content.classList.add('active');
            expandBtn.classList.add('active');
        }
        
        header.addEventListener('click', function() {
            content.classList.toggle('active');
            expandBtn.classList.toggle('active');
            
            // Redraw chart when expanded to ensure proper sizing
            if (content.classList.contains('active')) {
                const canvasId = content.querySelector('canvas').id;
                setTimeout(() => {
                    if (window[canvasId + 'Chart']) {
                        window[canvasId + 'Chart'].resize();
                    }
                }, 300);
            }
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
        }
    });

    // Back to top button
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Background animation
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        // Random initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        
        particle.style.left = `${randomX}%`;
        particle.style.top = `${randomY}%`;
    });

    // Initialize all charts
    initializeCharts();

    // Prediction button click
    const predictButton = document.getElementById('predictButton');
    if (predictButton) {
        predictButton.addEventListener('click', function() {
            try {
                console.log("Predict button clicked");
                
                // Get input values
                const tvBudget = parseFloat(document.getElementById('tvBudget').value) || 0;
                const billboardsBudget = parseFloat(document.getElementById('billboardsBudget').value) || 0;
                const googleBudget = parseFloat(document.getElementById('googleBudget').value) || 0;
                const socialBudget = parseFloat(document.getElementById('socialBudget').value) || 0;
                const influencerBudget = parseFloat(document.getElementById('influencerBudget').value) || 0;
                const affiliateBudget = parseFloat(document.getElementById('affiliateBudget').value) || 0;
            
            console.log("Budget values:", {
                tvBudget,
                billboardsBudget,
                googleBudget,
                socialBudget,
                influencerBudget,
                affiliateBudget
            });
            
            // Calculate total budget
            const totalBudget = tvBudget + billboardsBudget + googleBudget + socialBudget + influencerBudget + affiliateBudget;
            console.log("Total budget:", totalBudget);
            
            // Simulate prediction (in a real app, this would call an API or use a trained model)
            const predictedSales = simulatePrediction(tvBudget, billboardsBudget, googleBudget, socialBudget, influencerBudget, affiliateBudget);
            console.log("Predicted sales:", predictedSales);
            
            // Calculate cost per unit
            const costPerUnit = totalBudget / predictedSales;
            console.log("Cost per unit:", costPerUnit);
            
            // Update results
            const predictedSalesElement = document.getElementById('predictedSales');
            const totalBudgetElement = document.getElementById('totalBudget');
            const costPerUnitElement = document.getElementById('costPerUnit');
            
            console.log("Elements:", {
                predictedSalesElement,
                totalBudgetElement,
                costPerUnitElement
            });
            
            if (predictedSalesElement) predictedSalesElement.textContent = predictedSales.toLocaleString();
            if (totalBudgetElement) totalBudgetElement.textContent = `$${totalBudget.toLocaleString()}`;
            if (costPerUnitElement) costPerUnitElement.textContent = `$${costPerUnit.toFixed(2)}`;
            
            // Add visual feedback for button
            predictButton.classList.add('clicked');
            setTimeout(() => {
                predictButton.classList.remove('clicked');
            }, 300);
            
            // Add visual feedback for result card
            const resultCard = document.querySelector('.result-card');
            resultCard.classList.add('updated');
            
            // Scroll to results if needed
            const resultCardPosition = resultCard.getBoundingClientRect().top + window.pageYOffset;
            const offset = 100; // Additional offset to ensure it's visible
            
            if (resultCardPosition > window.pageYOffset + window.innerHeight - 200) {
                window.scrollTo({
                    top: resultCardPosition - offset,
                    behavior: 'smooth'
                });
            }
            
            setTimeout(() => {
                resultCard.classList.remove('updated');
            }, 1000);
            
            } catch (error) {
                console.error("Error in prediction:", error);
            }
        });
    }
});

// Simulate prediction based on advertising budget
function simulatePrediction(tv, billboards, google, social, influencer, affiliate) {
    // This is a simplified model for demonstration
    // In a real application, this would use the actual trained model
    const baseSales = 2000;
    const tvImpact = tv * 3.5;
    const billboardsImpact = billboards * 1.2;
    const googleImpact = google * 2.8;
    const socialImpact = social * 3.2;
    const influencerImpact = influencer * 2.5;
    const affiliateImpact = affiliate * 1.8;
    
    // Add some randomness
    const randomFactor = Math.random() * 500;
    
    // Calculate predicted sales
    const predictedSales = Math.round(
        baseSales + 
        tvImpact + 
        billboardsImpact + 
        googleImpact + 
        socialImpact + 
        influencerImpact + 
        affiliateImpact + 
        randomFactor
    );
    
    return predictedSales;
}

// Initialize all charts
function initializeCharts() {
    // Set global Chart.js options
    Chart.defaults.font.family = "'Poppins', sans-serif";
    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
    Chart.defaults.plugins.tooltip.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    
    // Get chart colors from CSS variables
    const chartColors = [
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-2'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-3'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-4'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-5'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-6'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-7'),
        getComputedStyle(document.documentElement).getPropertyValue('--chart-color-8')
    ];
    
    // Overview Dashboard Charts
    createPerformanceTrendsChart(chartColors);
    createChannelDistributionChart(chartColors);
    
    // ROI & Conversion Analysis Charts
    createRoiByChannelChart(chartColors);
    createConversionByChannelChart(chartColors);
    createRoiVsConversionChart(chartColors);
    createRoiByCampaignChart(chartColors);
    createRoiVsCostChart(chartColors);
    
    // Customer Engagement Metrics Charts
    createEngagementScoreChart(chartColors);
    createClicksVsImpressionsChart(chartColors);
    createCtrByChannelChart(chartColors);
    createEngagementTimeChart(chartColors);
    createEngagementConversionChart(chartColors);
    
    // Demographic Analysis Charts
    createGenderDistributionChart(chartColors);
    createAgeDistributionChart(chartColors);
    createRoiDemographicsChart(chartColors);
    createConversionDemographicsChart(chartColors);
    createDemographicSunburstChart(chartColors);
    
    // Channel Performance Comparison Charts
    createChannelPerformanceChart(chartColors);
    createChannelEngagementChart(chartColors);
    createTraditionalMediaChart(chartColors);
    createDigitalMediaChart(chartColors);
    
    // Advertising Success Prediction Charts
    createFeatureImportanceChart(chartColors);
    createPredictionAccuracyChart(chartColors);
    
    // Optimization Recommendations Charts
    createChannelEfficiencyChart(chartColors);
    createBudgetAllocationChart(chartColors);
}

// Performance Trends Chart
function createPerformanceTrendsChart(chartColors) {
    const ctx = document.getElementById('performanceTrendsChart');
    if (!ctx) return;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    window.performanceTrendsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'ROI',
                    data: [4.2, 4.5, 5.1, 5.3, 5.8, 6.2, 5.9, 6.5, 6.8, 7.1, 7.4, 7.8],
                    borderColor: chartColors[0],
                    backgroundColor: hexToRgba(chartColors[0], 0.1),
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Conversion Rate',
                    data: [0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1, 0.105],
                    borderColor: chartColors[1],
                    backgroundColor: hexToRgba(chartColors[1], 0.1),
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Ad Spend ($K)',
                    data: [10, 12, 15, 18, 20, 22, 25, 28, 30, 32, 35, 38],
                    borderColor: chartColors[2],
                    backgroundColor: hexToRgba(chartColors[2], 0.1),
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Channel Distribution Chart
function createChannelDistributionChart(chartColors) {
    const ctx = document.getElementById('channelDistributionChart');
    if (!ctx) return;
    
    window.channelDistributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Social Media', 'Search Ads', 'Display Ads', 'Email', 'Influencer', 'Affiliate'],
            datasets: [{
                data: [35, 25, 15, 10, 10, 5],
                backgroundColor: chartColors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// ROI By Channel Chart
function createRoiByChannelChart(chartColors) {
    const ctx = document.getElementById('roiByChannelChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Instagram', 'Facebook', 'Google Ads', 'YouTube', 'Pinterest'],
            datasets: [{
                label: 'ROI',
                data: [5.79, 7.21, 4.25, 3.89, 0.91],
                backgroundColor: chartColors[0],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Conversion By Channel Chart
function createConversionByChannelChart(chartColors) {
    const ctx = document.getElementById('conversionByChannelChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Instagram', 'Facebook', 'Google Ads', 'YouTube', 'Pinterest'],
            datasets: [{
                label: 'Conversion Rate',
                data: [0.15, 0.01, 0.12, 0.07, 0.03],
                backgroundColor: chartColors[1],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(1) + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ROI vs Conversion Rate Chart
function createRoiVsConversionChart(chartColors) {
    const ctx = document.getElementById('roiVsConversionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Instagram',
                    data: [{ x: 0.15, y: 5.79 }],
                    backgroundColor: chartColors[0],
                    pointRadius: 15
                },
                {
                    label: 'Facebook',
                    data: [{ x: 0.01, y: 7.21 }],
                    backgroundColor: chartColors[1],
                    pointRadius: 15
                },
                {
                    label: 'Google Ads',
                    data: [{ x: 0.12, y: 4.25 }],
                    backgroundColor: chartColors[2],
                    pointRadius: 15
                },
                {
                    label: 'YouTube',
                    data: [{ x: 0.07, y: 3.89 }],
                    backgroundColor: chartColors[3],
                    pointRadius: 15
                },
                {
                    label: 'Pinterest',
                    data: [{ x: 0.03, y: 0.91 }],
                    backgroundColor: chartColors[4],
                    pointRadius: 15
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: Conv. Rate: ${(context.parsed.x * 100).toFixed(2)}%, ROI: ${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'ROI (%)'
                    },
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Conversion Rate'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                }
            }
        }
    });
}

// ROI By Campaign Chart
function createRoiByCampaignChart(chartColors) {
    const ctx = document.getElementById('roiByCampaignChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Product Launch', 'Seasonal', 'Brand Awareness', 'Market Expansion', 'Rebranding'],
            datasets: [{
                label: 'ROI',
                data: [6.8, 6.2, 3.5, 5.4, 4.1],
                backgroundColor: chartColors[2],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ROI vs Acquisition Cost Chart
function createRoiVsCostChart(chartColors) {
    const ctx = document.getElementById('roiVsCostChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Campaigns',
                data: [
                    { x: 500, y: 5.79 },
                    { x: 500, y: 7.21 },
                    { x: 750, y: 4.25 },
                    { x: 1200, y: 3.89 },
                    { x: 300, y: 0.91 },
                    { x: 850, y: 6.2 },
                    { x: 950, y: 5.5 },
                    { x: 600, y: 4.8 },
                    { x: 400, y: 6.5 },
                    { x: 1000, y: 3.2 }
                ],
                backgroundColor: chartColors[3],
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Acquisition Cost: $${context.parsed.x}, ROI: ${context.parsed.y.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'ROI (%)'
                    },
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Acquisition Cost ($)'
                    }
                }
            }
        }
    });
}

// Engagement Score Chart
function createEngagementScoreChart(chartColors) {
    const ctx = document.getElementById('engagementScoreChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Instagram', 'Facebook', 'Google Ads', 'YouTube', 'Pinterest'],
            datasets: [{
                label: 'Engagement Score',
                data: [7.0, 5.0, 6.0, 8.0, 1.0],
                backgroundColor: chartColors[4],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Clicks vs Impressions Chart
function createClicksVsImpressionsChart(chartColors) {
    const ctx = document.getElementById('clicksVsImpressionsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Instagram',
                    data: [{ x: 3000, y: 500 }],
                    backgroundColor: chartColors[0],
                    pointRadius: 12
                },
                {
                    label: 'Facebook',
                    data: [{ x: 3000, y: 500 }],
                    backgroundColor: chartColors[1],
                    pointRadius: 10
                },
                {
                    label: 'Google Ads',
                    data: [{ x: 2500, y: 550 }],
                    backgroundColor: chartColors[2],
                    pointRadius: 11
                },
                {
                    label: 'YouTube',
                    data: [{ x: 4000, y: 600 }],
                    backgroundColor: chartColors[3],
                    pointRadius: 14
                },
                {
                    label: 'Pinterest',
                    data: [{ x: 1937, y: 293 }],
                    backgroundColor: chartColors[4],
                    pointRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: Impressions: ${context.parsed.x}, Clicks: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Clicks'
                    },
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Impressions'
                    }
                }
            }
        }
    });
}

// CTR By Channel Chart
function createCtrByChannelChart(chartColors) {
    const ctx = document.getElementById('ctrByChannelChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Instagram', 'Facebook', 'Google Ads', 'YouTube', 'Pinterest', 'Email', 'Search Ads'],
            datasets: [{
                label: 'CTR',
                data: [0.167, 0.167, 0.22, 0.15, 0.09, 0.25, 0.28],
                backgroundColor: chartColors[5],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(1) + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Engagement Over Time Chart
function createEngagementTimeChart(chartColors) {
    const ctx = document.getElementById('engagementTimeChart');
    if (!ctx) return;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Engagement Score',
                    data: [5.2, 5.5, 6.1, 6.3, 6.8, 7.2, 6.9, 7.5, 7.8, 8.1, 8.4, 8.8],
                    borderColor: chartColors[6],
                    backgroundColor: hexToRgba(chartColors[6], 0.1),
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'CTR',
                    data: [0.12, 0.13, 0.15, 0.16, 0.18, 0.19, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26],
                    borderColor: chartColors[7],
                    backgroundColor: hexToRgba(chartColors[7], 0.1),
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'CTR') {
                                return `CTR: ${(context.raw * 100).toFixed(1)}%`;
                            }
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Engagement vs Conversion Chart
function createEngagementConversionChart(chartColors) {
    const ctx = document.getElementById('engagementConversionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Campaigns',
                data: [
                    { x: 7, y: 0.15 },
                    { x: 5, y: 0.01 },
                    { x: 6, y: 0.12 },
                    { x: 8, y: 0.07 },
                    { x: 1, y: 0.03 },
                    { x: 9, y: 0.18 },
                    { x: 4, y: 0.05 },
                    { x: 3, y: 0.02 },
                    { x: 7, y: 0.14 },
                    { x: 6, y: 0.09 }
                ],
                backgroundColor: chartColors[0],
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Engagement Score: ${context.parsed.x}, Conversion Rate: ${(context.parsed.y * 100).toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Conversion Rate'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Engagement Score'
                    },
                    min: 0,
                    max: 10
                }
            }
        }
    });
}

// Gender Distribution Chart
function createGenderDistributionChart(chartColors) {
    const ctx = document.getElementById('genderDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Men', 'Women', 'All'],
            datasets: [{
                data: [45, 40, 15],
                backgroundColor: [chartColors[0], chartColors[1], chartColors[2]],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Age Distribution Chart
function createAgeDistributionChart(chartColors) {
    const ctx = document.getElementById('ageDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-60', '60+', 'All Ages'],
            datasets: [{
                label: 'Campaigns',
                data: [15, 30, 25, 20, 5, 5],
                backgroundColor: chartColors[3],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}% of campaigns`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ROI Demographics Chart
function createRoiDemographicsChart(chartColors) {
    const ctx = document.getElementById('roiDemographicsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-60'],
            datasets: [
                {
                    label: 'Men',
                    data: [4.2, 5.8, 4.9, 3.5],
                    backgroundColor: chartColors[0],
                    borderWidth: 0,
                    borderRadius: 5
                },
                {
                    label: 'Women',
                    data: [3.8, 6.2, 7.1, 4.3],
                    backgroundColor: chartColors[1],
                    borderWidth: 0,
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}% ROI`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Conversion Demographics Chart
function createConversionDemographicsChart(chartColors) {
    const ctx = document.getElementById('conversionDemographicsChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-60'],
            datasets: [
                {
                    label: 'Men',
                    data: [0.08, 0.12, 0.09, 0.05],
                    backgroundColor: chartColors[4],
                    borderWidth: 0,
                    borderRadius: 5
                },
                {
                    label: 'Women',
                    data: [0.07, 0.14, 0.15, 0.08],
                    backgroundColor: chartColors[5],
                    borderWidth: 0,
                    borderRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${(context.raw * 100).toFixed(1)}% Conversion Rate`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Demographic Sunburst Chart (simplified as doughnut since Chart.js doesn't have sunburst)
function createDemographicSunburstChart(chartColors) {
    const ctx = document.getElementById('demographicSunburstChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Men 18-24', 'Men 25-34', 'Men 35-44', 'Men 45-60', 'Women 18-24', 'Women 25-34', 'Women 35-44', 'Women 45-60'],
            datasets: [{
                data: [10, 15, 12, 8, 8, 18, 17, 12],
                backgroundColor: [
                    hexToRgba(chartColors[0], 0.7),
                    hexToRgba(chartColors[0], 0.9),
                    hexToRgba(chartColors[0], 0.5),
                    hexToRgba(chartColors[0], 0.3),
                    hexToRgba(chartColors[1], 0.7),
                    hexToRgba(chartColors[1], 0.9),
                    hexToRgba(chartColors[1], 0.5),
                    hexToRgba(chartColors[1], 0.3)
                ],
                borderWidth: 1,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}% of campaigns`;
                        }
                    }
                }
            }
        }
    });
}

// Channel Performance Chart
function createChannelPerformanceChart(chartColors) {
    const ctx = document.getElementById('channelPerformanceChart');
    if (!ctx) return;
    
    const channels = ['Instagram', 'Facebook', 'Google Ads', 'YouTube', 'Pinterest'];
    const roi = [5.79, 7.21, 4.25, 3.89, 0.91];
    const conversionRate = [0.15, 0.01, 0.12, 0.07, 0.03];
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: channels,
            datasets: [
                {
                    label: 'ROI',
                    data: roi,
                    backgroundColor: chartColors[0],
                    borderWidth: 0,
                    borderRadius: 5,
                    order: 1
                },
                {
                    label: 'Conversion Rate',
                    data: conversionRate,
                    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent
                    borderColor: chartColors[1],
                    borderWidth: 2,
                    type: 'line',
                    order: 0,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'ROI') {
                                return `ROI: ${context.raw}%`;
                            } else {
                                return `Conversion Rate: ${(context.raw * 100).toFixed(2)}%`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'ROI (%)'
                    },
                    grid: {
                        drawBorder: false
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Conversion Rate'
                    },
                    grid: {
                        drawBorder: false,
                        display: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Channel Engagement Chart
function createChannelEngagementChart(chartColors) {
    const ctx = document.getElementById('channelEngagementChart');
    if (!ctx) return;
    
    const channels = ['Instagram', 'Facebook', 'Google Ads', 'YouTube', 'Pinterest'];
    const ctr = [0.167, 0.167, 0.22, 0.15, 0.09];
    const engagementScore = [7.0, 5.0, 6.0, 8.0, 1.0];
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: channels,
            datasets: [
                {
                    label: 'CTR',
                    data: ctr,
                    backgroundColor: chartColors[2],
                    borderWidth: 0,
                    borderRadius: 5,
                    order: 1
                },
                {
                    label: 'Engagement Score',
                    data: engagementScore,
                    backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent
                    borderColor: chartColors[3],
                    borderWidth: 2,
                    type: 'line',
                    order: 0,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'CTR') {
                                return `CTR: ${(context.raw * 100).toFixed(2)}%`;
                            } else {
                                return `Engagement Score: ${context.raw}`;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'CTR'
                    },
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Engagement Score'
                    },
                    grid: {
                        drawBorder: false,
                        display: false
                    },
                    min: 0,
                    max: 10
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Traditional Media Chart
function createTraditionalMediaChart(chartColors) {
    const ctx = document.getElementById('traditionalMediaChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['TV', 'Radio', 'Newspaper', 'Billboards'],
            datasets: [{
                label: 'Sales Impact',
                data: [0.65, 0.15, 0.08, 0.12],
                backgroundColor: chartColors[4],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Impact: ${(context.raw * 100).toFixed(0)}% of sales`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100).toFixed(0) + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Digital Media Chart
function createDigitalMediaChart(chartColors) {
    const ctx = document.getElementById('digitalMediaChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['ROI', 'Conversion Rate', 'Engagement', 'Cost Efficiency', 'Reach', 'Targeting'],
            datasets: [
                {
                    label: 'Social Media',
                    data: [8, 7, 9, 6, 8, 9],
                    backgroundColor: hexToRgba(chartColors[5], 0.2),
                    borderColor: chartColors[5],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[5]
                },
                {
                    label: 'Search Ads',
                    data: [7, 8, 5, 7, 6, 8],
                    backgroundColor: hexToRgba(chartColors[6], 0.2),
                    borderColor: chartColors[6],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[6]
                },
                {
                    label: 'Display Ads',
                    data: [5, 4, 6, 8, 9, 6],
                    backgroundColor: hexToRgba(chartColors[7], 0.2),
                    borderColor: chartColors[7],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[7]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            }
        }
    });
}

// Feature Importance Chart
function createFeatureImportanceChart(chartColors) {
    const ctx = document.getElementById('featureImportanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['TV', 'Social Media', 'Google Ads', 'Influencer', 'Affiliate', 'Billboards'],
            datasets: [{
                label: 'Importance',
                data: [0.35, 0.25, 0.18, 0.12, 0.06, 0.04],
                backgroundColor: chartColors,
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Prediction Accuracy Chart
function createPredictionAccuracyChart(chartColors) {
    const ctx = document.getElementById('predictionAccuracyChart');
    if (!ctx) return;
    
    // Generate some sample data
    const actualValues = [];
    const predictedValues = [];
    
    for (let i = 0; i < 50; i++) {
        const baseValue = 3000 + Math.random() * 5000;
        const actual = baseValue;
        // Add some noise to predictions (within ±15% of actual)
        const predicted = baseValue * (1 + (Math.random() * 0.3 - 0.15));
        
        actualValues.push(actual);
        predictedValues.push(predicted);
    }
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [
                {
                    label: 'Predictions',
                    data: actualValues.map((actual, i) => ({ x: actual, y: predictedValues[i] })),
                    backgroundColor: hexToRgba(chartColors[0], 0.7),
                    pointRadius: 6
                },
                {
                    label: 'Perfect Prediction',
                    data: [
                        { x: 3000, y: 3000 },
                        { x: 8000, y: 8000 }
                    ],
                    borderColor: chartColors[1],
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    type: 'line'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (context.datasetIndex === 0) {
                                return `Actual: ${context.parsed.x.toFixed(0)}, Predicted: ${context.parsed.y.toFixed(0)}`;
                            }
                            return '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Predicted Sales'
                    },
                    beginAtZero: true
                },
                x: {
                    title: {
                        display: true,
                        text: 'Actual Sales'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Channel Efficiency Chart
function createChannelEfficiencyChart(chartColors) {
    const ctx = document.getElementById('channelEfficiencyChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Social Media', 'Google Ads', 'TV', 'Influencer', 'Affiliate', 'Billboards'],
            datasets: [{
                label: 'Products Sold per $',
                data: [0.42, 0.38, 0.35, 0.28, 0.22, 0.15],
                backgroundColor: chartColors[2],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    title: {
                        display: true,
                        text: 'Efficiency (Products/$)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Budget Allocation Chart
function createBudgetAllocationChart(chartColors) {
    const ctx = document.getElementById('budgetAllocationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Social Media', 'Google Ads', 'TV', 'Influencer', 'Affiliate', 'Billboards'],
            datasets: [{
                data: [30, 25, 20, 15, 7, 3],
                backgroundColor: chartColors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}% ($${(context.raw * 20).toFixed(0)})`;
                        }
                    }
                }
            }
        }
    });
}

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
    // Remove the hash if it exists
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Return the rgba value
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}