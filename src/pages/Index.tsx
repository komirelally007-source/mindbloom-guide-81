import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MoodCheckIn from '@/components/MoodCheckIn';
import MoodTrends from '@/components/MoodTrends';
import WellnessRecommendations from '@/components/WellnessRecommendations';
import heroImage from '@/assets/hero-wellness.jpg';
import { Calendar, TrendingUp, Heart } from 'lucide-react';

interface MoodEntry {
  date: string;
  value: number;
  label: string;
  note?: string;
}

const Index = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { date: '2024-01-10', value: 4, label: 'Good' },
    { date: '2024-01-11', value: 3, label: 'Okay' },
    { date: '2024-01-12', value: 5, label: 'Great' },
    { date: '2024-01-13', value: 4, label: 'Good' },
    { date: '2024-01-14', value: 3, label: 'Okay' },
  ]);

  const handleMoodSubmit = (mood: { value: number; label: string; note: string }) => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      value: mood.value,
      label: mood.label,
      note: mood.note
    };
    setMoodEntries(prev => [...prev, newEntry]);
  };

  const todayEntry = moodEntries.find(entry => 
    entry.date === new Date().toISOString().split('T')[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-wellness-calm/20">
      {/* Header Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Wellness landscape" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>
        
        <div className="relative container mx-auto px-4 pt-16 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-wellness-growth to-wellness-energy bg-clip-text text-transparent">
              Student Wellness Monitor
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Track your mental wellness journey with daily check-ins, personalized insights, and supportive recommendations tailored just for you.
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-2xl font-bold text-foreground">{moodEntries.length}</div>
                <div className="text-sm text-muted-foreground">Days Tracked</div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-wellness-growth" />
                <div className="text-2xl font-bold text-foreground">
                  {moodEntries.length > 0 ? (moodEntries.reduce((sum, entry) => sum + entry.value, 0) / moodEntries.length).toFixed(1) : '0'}
                </div>
                <div className="text-sm text-muted-foreground">Average Mood</div>
              </div>
              <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
                <Heart className="w-8 h-8 mx-auto mb-3 text-wellness-energy" />
                <div className="text-2xl font-bold text-foreground">
                  {moodEntries.filter(entry => entry.value >= 4).length}
                </div>
                <div className="text-sm text-muted-foreground">Good Days</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Daily Check-in */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">
                {todayEntry ? 'Today\'s Update' : 'Daily Check-in'}
              </h2>
              {!todayEntry ? (
                <MoodCheckIn onSubmit={handleMoodSubmit} />
              ) : (
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center max-w-md mx-auto">
                  <div className="text-4xl mb-2">✅</div>
                  <h3 className="font-medium text-lg mb-2">Check-in Complete!</h3>
                  <p className="text-muted-foreground mb-4">
                    You recorded feeling <span className="font-medium text-primary">{todayEntry.label}</span> today.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setMoodEntries(prev => prev.filter(entry => entry.date !== todayEntry.date))}
                    className="text-sm"
                  >
                    Update Entry
                  </Button>
                </div>
              )}
            </section>

            {/* Wellness Recommendations */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">
                Wellness Activities
              </h2>
              <WellnessRecommendations />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Mood Trends */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">
                Your Progress
              </h2>
              <MoodTrends moodData={moodEntries} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
