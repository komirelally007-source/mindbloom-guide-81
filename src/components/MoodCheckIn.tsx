import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const moodOptions = [
  { emoji: '😊', label: 'Great', value: 5, color: 'wellness-energy' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'wellness-growth' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'wellness-calm' },
  { emoji: '😔', label: 'Low', value: 2, color: 'wellness-focus' },
  { emoji: '😢', label: 'Difficult', value: 1, color: 'destructive' },
];

interface MoodCheckInProps {
  onSubmit: (mood: { value: number; label: string; note: string }) => void;
}

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (selectedMood === null) return;
    
    const moodData = moodOptions.find(mood => mood.value === selectedMood);
    if (moodData) {
      onSubmit({
        value: selectedMood,
        label: moodData.label,
        note
      });
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`
                flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105
                ${selectedMood === mood.value 
                  ? 'border-primary bg-primary/10 shadow-lg' 
                  : 'border-border hover:border-primary/50 bg-background'
                }
              `}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium text-muted-foreground">{mood.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-3">
          <Textarea
            placeholder="How was your day? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[80px] resize-none border-border/50 bg-background/50"
          />
          
          <Button
            onClick={handleSubmit}
            disabled={selectedMood === null}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
          >
            Record Mood
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodCheckIn;