import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye, Heart, MessageCircle, BarChart3, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const Dashboard = () => {
  const projects = [
    { id: 1, title: 'E-commerce Redesign', views: 234, likes: 14, comments: 7 },
    { id: 2, title: 'Mobile App UI/UX', views: 198, likes: 23, comments: 12 },
    { id: 3, title: 'Brand Identity Design', views: 147, likes: 8, comments: 4 }
  ];

  useRequireAuth();

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-projectshelf-primary">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your portfolio.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/dashboard/projects/new">
            <Button className="bg-projectshelf-accent hover:bg-projectshelf-accent/90">
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full p-2 bg-blue-100">
                <Eye className="h-4 w-4 text-projectshelf-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,294</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full p-2 bg-purple-100">
                <Heart className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">68</div>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full p-2 bg-orange-100">
                <MessageCircle className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-green-600">+15% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full p-2 bg-green-100">
                <BarChart3 className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-gray-500">2 drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {projects.map(project => (
          <Card key={project.id}>
            <div className="h-36 bg-gray-200 rounded-t-lg"></div>
            <CardHeader className="pb-2">
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>Updated 2 days ago</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" />
                  <span>{project.views}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="mr-1 h-4 w-4" />
                  <span>{project.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  <span>{project.comments}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/dashboard/projects/${project.id}`} className="w-full">
                <Button variant="ghost" className="w-full justify-between">
                  View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Activity & To Do */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-4">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-projectshelf-accent" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">New profile visitor</p>
                  <p className="text-sm text-gray-500">Someone from Google visited your profile</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">Project liked</p>
                  <p className="text-sm text-gray-500">Lisa B. liked your "Mobile App UI/UX" project</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mr-4">
                  <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">New comment</p>
                  <p className="text-sm text-gray-500">John D. commented on your "E-commerce Redesign" project</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="mr-4">
                  <div className="h-9 w-9 rounded-full bg-projectshelf-accent/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-projectshelf-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Complete your profile</p>
                  <p className="text-sm text-gray-500">Add your bio and social links</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="mr-4">
                  <div className="h-9 w-9 rounded-full bg-projectshelf-accent/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-projectshelf-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Review analytics</p>
                  <p className="text-sm text-gray-500">See how your portfolio is performing</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="mr-4">
                  <div className="h-9 w-9 rounded-full bg-projectshelf-accent/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-projectshelf-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Connect social accounts</p>
                  <p className="text-sm text-gray-500">Share your work on social media</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
