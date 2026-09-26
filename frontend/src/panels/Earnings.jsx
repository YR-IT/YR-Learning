import React, { useState, useEffect } from 'react';
import './Earnings.css';

// Mock data - replace with API calls in a real application
const mockEarningsData = {
    totalRevenue: 12540.50,
    lastMonth: 1850.00,
    totalPayouts: 9500.00,
    monthlyChart: [
        { month: 'Jan', earnings: 1200 },
        { month: 'Feb', earnings: 1500 },
        { month: 'Mar', earnings: 1300 },
        { month: 'Apr', earnings: 1750 },
        { month: 'May', earnings: 1600 },
        { month: 'Jun', earnings: 1850 },
    ],
    recentTransactions: [
        { id: 't1', date: '2023-06-25', course: 'Introduction to React', amount: 49.99 },
        { id: 't2', date: '2023-06-24', course: 'UI/UX Design Fundamentals', amount: 39.99 },
        { id: 't3', date: '2023-06-24', course: 'Advanced Node.js', amount: 79.99 },
        { id: 't4', date: '2023-06-22', course: 'Introduction to React', amount: 49.99 },
        { id: 't5', date: '2023-06-20', course: 'UI/UX Design Fundamentals', amount: 39.99 },
    ]
};

const Earnings = () => {
    const [earnings, setEarnings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setEarnings(mockEarningsData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading earnings data...</div>;
    }

    if (!earnings) {
        return <div>Could not load earnings data.</div>;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return (
        <div className="earnings-container">
            <h2>Earnings Overview</h2>

            <div className="summary-cards">
                <div className="card">
                    <h3>Total Revenue</h3>
                    <p>{formatCurrency(earnings.totalRevenue)}</p>
                </div>
                <div className="card">
                    <h3>Last Month</h3>
                    <p>{formatCurrency(earnings.lastMonth)}</p>
                </div>
                <div className="card">
                    <h3>Total Payouts</h3>
                    <p>{formatCurrency(earnings.totalPayouts)}</p>
                </div>
            </div>

            <div className="chart-section">
                <h3>Monthly Earnings</h3>
                <div className="chart-placeholder">
                    {/* In a real app, you would use a charting library like Chart.js or Recharts here */}
                    <p>Chart visualization would be displayed here.</p>
                </div>
            </div>

            <div className="transactions-section">
                <h3>Recent Transactions</h3>
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Course</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {earnings.recentTransactions.map(tx => (
                            <tr key={tx.id}>
                                <td>{new Date(tx.date).toLocaleDateString()}</td>
                                <td>{tx.course}</td>
                                <td>{formatCurrency(tx.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Earnings;