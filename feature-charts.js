// This file contains direct implementations of the feature importance charts

document.addEventListener('DOMContentLoaded', function() {
    // Wait for the page to fully load
    setTimeout(function() {
        // Initialize the main Feature Importance chart
        initializeFeatureImportanceChart();
        
        // Initialize the prediction module Feature Importance chart
        initializeFeatureImportancePredictionChart();
        
        // Set up event listener for the prediction button
        const predictButton = document.querySelector('button[onclick="makePrediction()"]');
        if (predictButton) {
            predictButton.addEventListener('click', function() {
                updateFeatureImportancePredictionChart();
            });
        }
    }, 1000); // Wait 1 second to ensure Chart.js is loaded
});

// Initialize the main Feature Importance chart
function initializeFeatureImportanceChart() {
    const ctx = document.getElementById('featureImportanceChart');
    if (!ctx) return;
    
    // Define chart colors
    const chartColors = [
        '#4361ee', '#7209b7', '#f72585', '#4cc9f0', '#3a0ca3', '#ff9800'
    ];
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
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
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Importance: ${(context.raw * 100).toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
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

// Initialize the prediction module Feature Importance chart
function initializeFeatureImportancePredictionChart() {
    const ctx = document.getElementById('featureImportancePredictionChart');
    if (!ctx) return;
    
    // Define chart colors
    const chartColors = [
        '#4361ee', '#7209b7', '#f72585', '#4cc9f0', '#3a0ca3', '#ff9800'
    ];
    
    // Create gradients for the bars
    const gradients = [];
    const context = ctx.getContext('2d');
    
    chartColors.forEach(color => {
        const gradient = context.createLinearGradient(0, 0, 300, 0);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '80'); // Add 50% transparency
        gradients.push(gradient);
    });
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['TV', 'Social Media', 'Google Ads', 'Influencer', 'Affiliate', 'Billboards'],
            datasets: [{
                label: 'Impact on Sales',
                data: [0.35, 0.25, 0.18, 0.12, 0.06, 0.04],
                backgroundColor: gradients,
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
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Impact: ${(context.raw * 100).toFixed(1)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value * 100) + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Update the prediction module Feature Importance chart based on user inputs
function updateFeatureImportancePredictionChart() {
    // Get input values
    const tvBudget = parseFloat(document.getElementById('tvBudget').value) || 0;
    const billboardsBudget = parseFloat(document.getElementById('billboardsBudget').value) || 0;
    const googleBudget = parseFloat(document.getElementById('googleBudget').value) || 0;
    const socialBudget = parseFloat(document.getElementById('socialBudget').value) || 0;
    const influencerBudget = parseFloat(document.getElementById('influencerBudget').value) || 0;
    const affiliateBudget = parseFloat(document.getElementById('affiliateBudget').value) || 0;
    
    // Impact factors
    const tvFactor = 3.5;
    const billboardsFactor = 1.2;
    const googleFactor = 2.8;
    const socialFactor = 3.2;
    const influencerFactor = 2.5;
    const affiliateFactor = 1.8;
    
    // Calculate the impact of each channel
    const tvImpact = tvBudget * tvFactor;
    const billboardsImpact = billboardsBudget * billboardsFactor;
    const googleImpact = googleBudget * googleFactor;
    const socialImpact = socialBudget * socialFactor;
    const influencerImpact = influencerBudget * influencerFactor;
    const affiliateImpact = affiliateBudget * affiliateFactor;
    
    // Calculate total impact
    const totalImpact = tvImpact + billboardsImpact + googleImpact + 
                       socialImpact + influencerImpact + affiliateImpact;
    
    // Calculate relative importance (as percentages)
    const tvImportance = totalImpact > 0 ? tvImpact / totalImpact : 0;
    const billboardsImportance = totalImpact > 0 ? billboardsImpact / totalImpact : 0;
    const googleImportance = totalImpact > 0 ? googleImpact / totalImpact : 0;
    const socialImportance = totalImpact > 0 ? socialImpact / totalImpact : 0;
    const influencerImportance = totalImpact > 0 ? influencerImpact / totalImpact : 0;
    const affiliateImportance = totalImpact > 0 ? affiliateImpact / totalImpact : 0;
    
    // Get existing chart instance and update it
    const ctx = document.getElementById('featureImportancePredictionChart');
    if (!ctx) return;
    
    const chartInstance = Chart.getChart(ctx);
    if (chartInstance) {
        chartInstance.data.datasets[0].data = [
            tvImportance, 
            socialImportance, 
            googleImportance, 
            influencerImportance, 
            affiliateImportance, 
            billboardsImportance
        ];
        chartInstance.update();
    }
}