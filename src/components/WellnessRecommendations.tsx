import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Moon, Activity } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'mindfulness' | 'physical' | 'sleep' | 'social';
  duration: string;
  icon: React.ReactNode;
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    title: '5-Minute Breathing Exercise',
    description: 'Take a moment to center yourself with deep, mindful breathing.',
    category: 'mindfulness',
    duration: '5 min',
    icon: <Brain className="w-4 h-4" />
  },
  {
    id: '2',
    title: 'Quick Walk Outside',
    description: 'Fresh air and gentle movement can boost your mood naturally.',
    category: 'physical',
    duration: '10 min',
    icon: <Activity className="w-4 h-4" />
  },
  {
    id: '3',
    title: 'Gratitude Reflection',
    description: 'Write down three things you\'re grateful for today.',
    category: 'mindfulness',
    duration: '3 min',
    icon: <Heart className="w-4 h-4" />
  },
  {
    id: '4',
    title: 'Prepare for Better Sleep',
    description: 'Wind down with a calming bedtime routine.',
    category: 'sleep',
    duration: '15 min',
    icon: <Moon className="w-4 h-4" />
  }
];

const categoryColors = {
  mindfulness: 'bg-wellness-calm text-wellness-calm-foreground',
  physical: 'bg-wellness-energy text-wellness-energy-foreground',
  sleep: 'bg-wellness-focus text-wellness-focus-foreground',
  social: 'bg-wellness-growth text-wellness-growth-foreground',
};

const WellnessRecommendations: React.FC = () => {
  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-wellness-growth to-wellness-energy bg-clip-text text-transparent">
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start space-x-3 flex-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                {rec.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {rec.duration}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {rec.category}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="ml-4 border-primary/30 hover:bg-primary/5 hover:border-primary/50"
            >
              Try Now
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WellnessRecommendations;