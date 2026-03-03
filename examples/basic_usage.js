// 基础使用示例
const SimpleMarketAnalyzer = require('../simple_analyzer.js');

console.log('=== Market Analyzer 基础使用示例 ===\n');

// 创建分析器实例
const analyzer = new SimpleMarketAnalyzer();

// 示例1: 生成模拟数据并分析
console.log('1. 生成30天模拟数据:');
const sampleData = analyzer.generateSampleData(30);
console.log(`   生成 ${sampleData.length} 天数据`);
console.log(`   第一天: ${sampleData[0].date}, 销售额: ¥${sampleData[0].sales}`);
console.log(`   最后一天: ${sampleData[sampleData.length-1].date}, 销售额: ¥${sampleData[sampleData.length-1].sales}`);

// 示例2: 分析趋势
console.log('\n2. 分析数据趋势:');
const analysis = analyzer.analyzeTrends();
console.log(`   总销售额: ¥${analysis.totalSales.toLocaleString()}`);
console.log(`   日均销售额: ¥${analysis.avgDailySales.toLocaleString()}`);
console.log(`   销售增长率: ${analysis.salesGrowth}`);
console.log(`   平均转化率: ${analysis.avgConversionRate}`);
console.log(`   最佳销售日: ${analysis.bestDay}`);
console.log(`   最差销售日: ${analysis.worstDay}`);

// 示例3: 生成报告
console.log('\n3. 生成分析报告:');
const report = analyzer.generateReport('example_report.md');
console.log('   报告已生成: example_report.md');

// 示例4: 导出数据
console.log('\n4. 导出CSV数据:');
analyzer.generateCSV('example_data.csv');
console.log('   CSV数据已导出: example_data.csv');

// 示例5: 自定义分析
console.log('\n5. 自定义分析示例:');
function customAnalysis(data) {
    // 计算周平均值
    const weeklyAverages = [];
    for (let i = 0; i < data.length; i += 7) {
        const weekData = data.slice(i, i + 7);
        const weekAvg = weekData.reduce((sum, day) => sum + day.sales, 0) / weekData.length;
        weeklyAverages.push({
            week: Math.floor(i/7) + 1,
            averageSales: Math.round(weekAvg)
        });
    }
    
    return weeklyAverages;
}

const weeklyAnalysis = customAnalysis(sampleData);
console.log('   周平均销售额分析:');
weeklyAnalysis.forEach(week => {
    console.log(`   第${week.week}周: ¥${week.averageSales.toLocaleString()}`);
});

console.log('\n=== 示例完成 ===');
console.log('\n下一步:');
console.log('1. 查看生成的文件: example_report.md 和 example_data.csv');
console.log('2. 修改 simple_analyzer.js 添加自定义分析逻辑');
console.log('3. 集成到你的工作流中实现自动化');
console.log('\n需要帮助? 添加微信: ss66s66e');