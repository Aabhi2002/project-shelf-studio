import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { ArrowUpRight, Users, Eye, MousePointerClick, Clock } from 'lucide-react';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');

  // Mock data for charts
  const viewsData = [
    { name: 'Week 1', value: 120 },
    { name: 'Week 2', value: 180 },
    { name: 'Week 3', value: 150 },
    { name: 'Week 4', value: 210 },
  ];

  const projectPerformanceData = [
    { 
      name: 'E-commerce Website', 
      views: 247, 
      engagement: 35, 
      clicks: 42 
    },
    { 
      name: 'Mobile Banking App', 
      views: 189, 
      engagement: 28, 
      clicks: 33 
    },
    { 
      name: 'Corporate Branding', 
      views: 156, 
      engagement: 22, 
      clicks: 27 
    },
    { 
      name: 'Healthcare Dashboard', 
      views: 120, 
      engagement: 18, 
      clicks: 15 
    },
    { 
      name: 'Restaurant System', 
      views: 89, 
      engagement: 12, 
      clicks: 18 
    },
  ];

  const visitorData = [
    { date: '05/01', visitors: 15 },
    { date: '05/02', visitors: 22 },
    { date: '05/03', visitors: 18 },
    { date: '05/04', visitors: 25 },
    { date: '05/05', visitors: 30 },
    { date: '05/06', visitors: 28 },
    { date: '05/07', visitors: 32 },
    { date: '05/08', visitors: 34 },
    { date: '05/09', visitors: 32 },
    { date: '05/10', visitors: 40 },
    { date: '05/11', visitors: 45 },
    { date: '05/12', visitors: 38 },
    { date: '05/13', visitors: 35 },
    { date: '05/14', visitors: 42 },
  ];

  useRequireAuth();

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-projectshelf-primary">Analytics</h1>
          <p className="text-gray-600">Monitor how your portfolio is performing</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-48">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 3 months</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 rounded-full p-2 bg-blue-100">
                  <Eye className="h-4 w-4 text-projectshelf-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">1,294</div>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-xs font-medium">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>12%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 rounded-full p-2 bg-purple-100">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">684</div>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-xs font-medium">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>8%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Click-through Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 rounded-full p-2 bg-green-100">
                  <MousePointerClick className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">6.2%</div>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-xs font-medium">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Time on Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 rounded-full p-2 bg-orange-100">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">2m 46s</div>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-xs font-medium">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                <span>18%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Traffic Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Visitor Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={visitorData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="visitors" 
                stroke="#2388FF" 
                strokeWidth={2} 
                dot={{ strokeWidth: 2 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Performance */}
      <Tabs defaultValue="views" className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Project Performance</h2>
          <TabsList>
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="clicks">Clicks</TabsTrigger>
          </TabsList>
        </div>

        <Card>
          <CardContent className="pt-6">
            <TabsContent value="views">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="views" fill="#2388FF" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="engagement">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#7E69AB" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="clicks">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={projectPerformanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#E26D5C" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {/* Referral Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-projectshelf-accent rounded-full mr-2"></div>
                <span className="text-sm">Direct</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">42%</span>
                <div className="w-36 bg-gray-200 rounded-full h-2">
                  <div className="bg-projectshelf-accent h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-purple-600 rounded-full mr-2"></div>
                <span className="text-sm">Google</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">28%</span>
                <div className="w-36 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm">Twitter</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">15%</span>
                <div className="w-36 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-pink-500 rounded-full mr-2"></div>
                <span className="text-sm">Dribbble</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">8%</span>
                <div className="w-36 bg-gray-200 rounded-full h-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm">Other</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">7%</span>
                <div className="w-36 bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
