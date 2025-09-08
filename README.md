# Sales Analytics Dashboard

A comprehensive sales analytics dashboard built with Next.js 15, TypeScript, and Tailwind CSS. This application provides interactive visualizations and filtering capabilities for sales data across multiple years (2022-2024).

![Sales Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center)

## 🚀 Features

### Core Functionality
- **Multi-Year Sales Analysis**: View and compare sales data for 2022, 2023, and 2024
- **Interactive Charts**: Multiple chart types including line charts, bar charts, and pie charts
- **Real-time Filtering**: Filter data by category, region, year, and custom sales thresholds
- **Responsive Design**: Fully responsive layout that works on desktop and mobile devices
- **Dark/Light Mode**: Built-in theme switching capabilities

### Chart Components
- **Revenue Trend Chart**: Line chart showing revenue trends across months and years
- **Category Sales Chart**: Bar chart displaying sales performance by product category
- **Regional Distribution Chart**: Pie chart showing sales distribution across different regions
- **Quarterly Comparison Chart**: Bar chart comparing quarterly performance across years
- **Multi-Type Chart**: Interactive chart that can switch between bar, line, and pie chart views

### Interactive Features
- **Custom Filter Panel**: Collapsible filter panel with multiple filtering options
- **Sales Threshold Filter**: Set custom minimum sales amounts to filter data
- **Chart Type Switching**: Toggle between different chart visualizations
- **Data Export**: Export current view data to CSV format
- **Real-time Refresh**: Refresh data and charts with a single click

### Advanced Filtering
- Filter by product categories (Electronics, Clothing, Home & Garden, etc.)
- Filter by regions (North America, Europe, Asia Pacific, etc.)
- Filter by specific years or view all years combined
- Apply custom sales thresholds to focus on high-performing data
- Clear individual filters or reset all filters at once

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Charts**: Recharts library for interactive data visualizations
- **UI Components**: Custom component library built with Radix UI primitives
- **Icons**: Lucide React icons
- **Data**: Mock sales data generated to simulate real Kaggle datasets

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm package manager

### Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd sales-analytics-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── sales/           # API routes for sales data
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── charts/              # Chart components
│   │   ├── category-sales-chart.tsx
│   │   ├── multi-type-chart.tsx
│   │   ├── quarterly-comparison-chart.tsx
│   │   ├── regional-distribution-chart.tsx
│   │   └── revenue-trend-chart.tsx
│   ├── filters/             # Filter components
│   │   └── filter-panel.tsx
│   ├── ui/                  # Base UI components
│   ├── dashboard-header.tsx
│   ├── dashboard-layout.tsx
│   ├── metrics-cards.tsx
│   └── sidebar.tsx
├── lib/
│   ├── api.ts               # API client functions
│   ├── mock-data.ts         # Mock data generation
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
└── README.md
\`\`\`

## 🎯 Usage Guide

### Dashboard Navigation
- Use the sidebar to navigate between different sections
- The main dashboard shows an overview of all sales metrics
- Click on chart elements for detailed tooltips

### Filtering Data
1. **Expand the Filter Panel**: Click "Expand" in the filter section
2. **Set Sales Threshold**: Enter a minimum sales amount to filter low-performing data
3. **Select Categories**: Choose specific product categories to analyze
4. **Pick Regions**: Focus on specific geographical regions
5. **Choose Years**: Select individual years or view all years combined

### Chart Interactions
- **Multi-Type Chart**: Use the chart type buttons (bar/line/pie) to switch visualizations
- **Hover Effects**: Hover over chart elements to see detailed data points
- **Year Selection**: Use dropdowns in individual charts to change the year view
- **Export Data**: Click the "Export" button to download current data as CSV

### Refreshing Data
- Click the "Refresh" button in the header to reload all chart data
- Individual charts will update automatically when filters are applied

## 🔧 API Endpoints

### Sales Data API
- `GET /api/sales` - Get summary data for all years
- `GET /api/sales?year=2024` - Get detailed data for a specific year
- `GET /api/sales?year=2024&category=Electronics` - Get filtered data by category
- `GET /api/sales?year=2024&region=North America` - Get filtered data by region

### Metrics API
- `GET /api/sales/metrics` - Get combined metrics across all years

### Query Parameters
- `year`: Filter by specific year (2022, 2023, 2024)
- `category`: Filter by product category
- `region`: Filter by geographical region

## 📊 Data Structure

The application uses realistic mock sales data that includes:

- **Sales Records**: Individual transactions with revenue, units sold, dates
- **Product Categories**: 8 different categories (Electronics, Clothing, etc.)
- **Geographical Regions**: 5 major regions worldwide
- **Customer Segments**: Enterprise, SMB, Consumer, Government
- **Time Periods**: Monthly, quarterly, and yearly aggregations
- **Growth Metrics**: Year-over-year growth rates and trends

## 🚀 Future Enhancements

### Planned Features
- **Real API Integration**: Connect to actual sales databases or APIs
- **Advanced Analytics**: Add predictive analytics and forecasting
- **User Authentication**: Add user accounts and personalized dashboards
- **Data Import**: Allow users to upload their own sales data
- **More Chart Types**: Add scatter plots, area charts, and heatmaps
- **Drill-down Capabilities**: Click on chart elements to see detailed breakdowns
- **Automated Reports**: Generate and schedule automated reports
- **Mobile App**: Create a companion mobile application

### Technical Improvements
- **Performance Optimization**: Implement data virtualization for large datasets
- **Caching**: Add Redis caching for improved API performance
- **Testing**: Add comprehensive unit and integration tests
- **Accessibility**: Enhance accessibility features and screen reader support
- **Internationalization**: Add multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Recharts**: For providing excellent React chart components
- **Tailwind CSS**: For the utility-first CSS framework
- **Next.js Team**: For the amazing React framework
- **Radix UI**: For accessible UI primitives
- **Lucide**: For beautiful icons

## 📞 Support

If you have any questions or need help with setup, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Reach out to the development team

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
