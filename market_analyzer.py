#!/usr/bin/env python3
"""
市场数据分析工具 - 演示项目
功能：模拟市场数据收集和分析
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import json

class MarketAnalyzer:
    """市场数据分析器"""
    
    def __init__(self):
        self.data = None
        
    def generate_sample_data(self, days=30):
        """生成模拟市场数据"""
        dates = [datetime.now() - timedelta(days=i) for i in range(days)]
        dates.reverse()
        
        # 模拟电商销售数据
        np.random.seed(42)
        base_sales = 1000
        trend = np.linspace(0, 0.3, days)  # 上升趋势
        noise = np.random.normal(0, 0.1, days)
        
        sales = base_sales * (1 + trend + noise)
        visitors = sales * np.random.uniform(8, 12, days)
        conversion_rate = sales / visitors * 100
        
        self.data = pd.DataFrame({
            'date': dates,
            'sales': sales.astype(int),
            'visitors': visitors.astype(int),
            'conversion_rate': np.round(conversion_rate, 2)
        })
        
        return self.data
    
    def analyze_trends(self):
        """分析趋势"""
        if self.data is None:
            self.generate_sample_data()
            
        analysis = {
            'total_sales': int(self.data['sales'].sum()),
            'avg_daily_sales': int(self.data['sales'].mean()),
            'sales_growth': f"{((self.data['sales'].iloc[-1] / self.data['sales'].iloc[0] - 1) * 100):.1f}%",
            'avg_conversion_rate': f"{self.data['conversion_rate'].mean():.2f}%",
            'best_day': self.data.loc[self.data['sales'].idxmax(), 'date'].strftime('%Y-%m-%d'),
            'worst_day': self.data.loc[self.data['sales'].idxmin(), 'date'].strftime('%Y-%m-%d')
        }
        
        return analysis
    
    def generate_report(self, output_file='market_report.md'):
        """生成分析报告"""
        analysis = self.analyze_trends()
        
        report = f"""# 市场数据分析报告
生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M')}
分析周期: {self.data['date'].min().strftime('%Y-%m-%d')} 至 {self.data['date'].max().strftime('%Y-%m-%d')}

## 关键指标
- **总销售额**: ¥{analysis['total_sales']:,}
- **日均销售额**: ¥{analysis['avg_daily_sales']:,}
- **销售增长率**: {analysis['sales_growth']}
- **平均转化率**: {analysis['avg_conversion_rate']}
- **最佳销售日**: {analysis['best_day']}
- **最差销售日**: {analysis['worst_day']}

## 趋势分析
1. 销售呈现{analysis['sales_growth']}的增长率
2. 转化率稳定在{analysis['avg_conversion_rate']}左右
3. 建议关注{analysis['worst_day']}的表现，分析原因

## 建议
1. 加大最佳日期的营销投入
2. 优化转化漏斗，提升转化率
3. 建立预警机制，避免最差日情况重复
"""
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"报告已生成: {output_file}")
        return report
    
    def plot_sales_trend(self, save_path='sales_trend.png'):
        """绘制销售趋势图"""
        plt.figure(figsize=(10, 6))
        plt.plot(self.data['date'], self.data['sales'], marker='o', linewidth=2)
        plt.title('销售趋势分析', fontsize=14, fontweight='bold')
        plt.xlabel('日期', fontsize=12)
        plt.ylabel('销售额 (¥)', fontsize=12)
        plt.grid(True, alpha=0.3)
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.savefig(save_path, dpi=300)
        plt.close()
        print(f"图表已保存: {save_path}")

if __name__ == "__main__":
    analyzer = MarketAnalyzer()
    data = analyzer.generate_sample_data()
    print("数据预览:")
    print(data.head())
    
    analysis = analyzer.analyze_trends()
    print("\n分析结果:")
    for key, value in analysis.items():
        print(f"{key}: {value}")
    
    analyzer.generate_report()
    analyzer.plot_sales_trend()