const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/transaction');

router.get('/init', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.send('Database initialized with seed data.');
  } catch (error) {
    res.status(500).send('Error initializing database');
  }
});

router.get('/transactions', async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;
  const startOfMonth = new Date(2024, month - 1, 1);
  const endOfMonth = new Date(2024, month, 0);
  const searchRegex = new RegExp(search, 'i');

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { price: searchRegex },
      ],
    })
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.json(transactions);
  } catch (error) {
    res.status(500).send('Error fetching transactions');
  }
});

router.get('/statistics', async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(2024, month - 1, 1);
  const endOfMonth = new Date(2024, month, 0);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalSaleAmount = transactions.reduce((acc, curr) => acc + curr.price, 0);
    const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    res.status(500).send('Error fetching statistics');
  }
});

router.get('/barchart', async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(2024, month - 1, 1);
  const endOfMonth = new Date(2024, month, 0);

  const priceRanges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 101, max: 200 },
    { range: '201-300', min: 201, max: 300 },
    { range: '301-400', min: 301, max: 400 },
    { range: '401-500', min: 401, max: 500 },
    { range: '501-600', min: 501, max: 600 },
    { range: '601-700', min: 601, max: 700 },
    { range: '701-800', min: 701, max: 800 },
    { range: '801-900', min: 801, max: 900 },
    { range: '901-above', min: 901, max: Infinity },
  ];

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const barChartData = priceRanges.map(range => ({
      range: range.range,
      count: transactions.filter(transaction => transaction.price >= range.min && transaction.price <= range.max).length,
    }));

    res.json(barChartData);
  } catch (error) {
    res.status(500).send('Error fetching bar chart data');
  }
});

router.get('/piechart', async (req, res) => {
  const { month } = req.query;
  const startOfMonth = new Date(2024, month - 1, 1);
  const endOfMonth = new Date(2024, month, 0);

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const categoryData = transactions.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = 0;
      acc[curr.category]++;
      return acc;
    }, {});

    res.json(Object.keys(categoryData).map(category => ({
      category,
      count: categoryData[category],
    })));
  } catch (error) {
    res.status(500).send('Error fetching pie chart data');
  }
});

router.get('/combined', async (req, res) => {
  const { month } = req.query;

  try {
    const transactionsResponse = await axios.get(`http://localhost:5000/api/transactions`, { params: { month } });
    const statisticsResponse = await axios.get(`http://localhost:5000/api/statistics`, { params: { month } });
    const barChartResponse = await axios.get(`http://localhost:5000/api/barchart`, { params: { month } });
    const pieChartResponse = await axios.get(`http://localhost:5000/api/piechart`, { params: { month } });

    res.json({
      transactions: transactionsResponse.data,
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    });
  } catch (error) {
    res.status(500).send('Error fetching combined data');
  }
});

module.exports = router;
