import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Clock, BookOpen, Star, Zap, Target } from "lucide-react"

export default function AchievementsList() {
  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first alphabet practice session",
      icon: <BookOpen className="h-6 w-6" />,
      unlocked: true,
      date: "June 10, 2023",
      color: "text-kid-primary bg-kid-primary/10",
    },
    {
      id: 2,
      title: "5-Day Streak",
      description: "Practice for 5 consecutive days",
      icon: <Calendar className="h-6 w-6" />,
      unlocked: true,
      date: "June 12, 2023",
      color: "text-kid-accent bg-kid-accent/10",
    },
    {
      id: 3,
      title: "Alphabet Master",
      description: "Learn all alphabets in a language",
      icon: <Star className="h-6 w-6" />,
      unlocked: false,
      color: "text-kid-secondary bg-kid-secondary/10",
    },
    {
      id: 4,
      title: "Speed Demon",
      description: "Complete a practice session in under 5 minutes",
      icon: <Zap className="h-6 w-6" />,
      unlocked: true,
      date: "June 15, 2023",
      color: "text-kid-blue bg-kid-blue/10",
    },
    {
      id: 5,
      title: "Perfect Score",
      description: "Get 100% accuracy in a practice session",
      icon: <Target className="h-6 w-6" />,
      unlocked: false,
      color: "text-kid-purple bg-kid-purple/10",
    },
    {
      id: 6,
      title: "Hour of Power",
      description: "Practice for a total of 60 minutes",
      icon: <Clock className="h-6 w-6" />,
      unlocked: true,
      date: "June 18, 2023",
      color: "text-kid-orange bg-kid-orange/10",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-6 w-6 text-kid-accent" />
          <span>Achievements</span>
        </CardTitle>
        <CardDescription>Track your learning milestones and achievements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-start space-x-4 rounded-xl border-2 border-kid-primary/10 p-4 ${
                !achievement.unlocked ? "opacity-60" : "hover:bg-accent/5"
              } transition-colors`}
            >
              <div
                className={`rounded-full p-2 ${
                  achievement.unlocked ? achievement.color : "bg-muted text-muted-foreground"
                }`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold leading-none">{achievement.title}</p>
                  {achievement.unlocked ? (
                    <Badge
                      variant="outline"
                      className="text-xs bg-kid-accent/10 text-kid-accent border-kid-accent/20 rounded-full"
                    >
                      Unlocked
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs rounded-full">
                      Locked
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && achievement.date && (
                  <p className="text-xs text-muted-foreground">Achieved on {achievement.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

