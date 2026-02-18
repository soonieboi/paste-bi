export interface ExampleDataset {
  name: string
  description: string
  data: string
}

export const exampleDatasets: ExampleDataset[] = [
  {
    name: 'Monthly Sales',
    description: 'E-commerce sales data by month',
    data: `Month,Revenue,Orders,AvgOrderValue
January,45000,320,140.63
February,52000,380,136.84
March,48000,350,137.14
April,61000,420,145.24
May,58000,400,145.00
June,72000,480,150.00
July,85000,550,154.55
August,78000,520,150.00
September,69000,470,146.81
October,92000,600,153.33
November,115000,750,153.33
December,135000,890,151.69`,
  },
  {
    name: 'Product Performance',
    description: 'Product category breakdown',
    data: `Category,Units Sold,Revenue,Return Rate
Electronics,1250,187500,4.2%
Clothing,3200,96000,8.5%
Home & Garden,890,44500,3.1%
Books,4500,67500,1.2%
Sports,1100,55000,5.8%
Beauty,2300,69000,6.3%`,
  },
  {
    name: 'Website Traffic',
    description: 'Daily website metrics for a week',
    data: `Day	Visitors	PageViews	BounceRate	AvgSessionDuration
Monday	12500	45000	42%	3:24
Tuesday	14200	52000	38%	3:45
Wednesday	13800	49000	40%	3:32
Thursday	15100	55000	36%	3:58
Friday	16500	61000	35%	4:12
Saturday	11200	38000	48%	2:45
Sunday	9800	32000	52%	2:30`,
  },
  {
    name: 'Customer Survey',
    description: 'NPS survey results by department',
    data: `Department,Promoters,Passives,Detractors,NPS Score
Sales,145,42,23,58
Support,89,65,46,22
Product,112,38,15,59
Billing,67,54,79,-6
Shipping,98,72,30,34`,
  },
]
