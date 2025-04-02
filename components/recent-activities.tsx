import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, Award, TrendingUp } from "lucide-react"

export default function RecentActivities() {
  // Mock data for recent activities
  const activities = [
    {
      id: 1,
      type: "practice",
      language: "Hindi",
      letter: "अ",
      date: "Today, 10:30 AM",
      duration: "15 minutes",
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-kid-primary bg-kid-primary/10",
    },
    {
      id: 2,
      type: "achievement",
      title: "5-Day Streak",
      description: "You've practiced for 5 days in a row!",
      date: "Yesterday, 9:15 PM",
      icon: <Award className="h-5 w-5" />,
      color: "text-kid-accent bg-kid-accent/10",
    },
    {
      id: 3,
      type: "practice",
      language: "Tamil",
      letter: "அ",
      date: "Yesterday, 4:45 PM",
      duration: "20 minutes",
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-kid-secondary bg-kid-secondary/10",
    },
    {
      id: 4,
      type: "level_up",
      language: "Hindi",
      level: "Intermediate",
      date: "2 days ago",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-kid-purple bg-kid-purple/10",
    },
    {
      id: 5,
      type: "practice",
      language: "Bengali",
      letter: "অ",
      date: "3 days ago",
      duration: "10 minutes",
      icon: <BookOpen className="h-5 w-5" />,
      color: "text-kid-blue bg-kid-blue/10",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-kid-primary" />
          <span>Recent Activities</span>
        </CardTitle>
        <CardDescription>Your learning activities from the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 rounded-xl border-2 border-kid-primary/10 p-4 hover:bg-accent/5 transition-colors"
            >
              <div className={`rounded-full p-2 ${activity.color}`}>{activity.icon}</div>
              <div className="flex-1 space-y-1">
                {activity.type === "practice" && (
                  <>
                    <p className="text-sm font-bold leading-none">
                      Practiced {activity.language} - Letter {activity.letter}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.duration} of practice</p>
                  </>
                )}
                {activity.type === "achievement" && (
                  <>
                    <p className="text-sm font-bold leading-none">Achievement Unlocked: {activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </>
                )}
                {activity.type === "level_up" && (
                  <>
                    <p className="text-sm font-bold leading-none">Level Up in {activity.language}</p>
                    <p className="text-sm text-muted-foreground">Advanced to {activity.level} level</p>
                  </>
                )}
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

