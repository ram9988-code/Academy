import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Interactive Courses",
    description:
      "Engage with multimedia content, quizzes, and assignments designed to enhance your learning experience.",
    icon: "📚",
  },
  {
    title: "Expert Instructors",
    description:
      "Learn from industry professionals and experienced educators who are passionate about teaching.",
    icon: "👩‍🏫",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress reports and performance analytics.",
    icon: "📈",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners to share knowledge, collaborate on projects, and support each other.",
    icon: "🤝",
  },
];
export default function Home() {
  return (
    <>
      <section className="relative py-40">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant={"outline"} className="text-sm">
            The Future of Online Education
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Elevate your Learning Experience
          </h1>
          <p className="max-w-[700px] md:text-xl text-muted-foreground">
            Discover a new way to learn our modern, interactive larning
            managment system. Access high-quality courses anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/courses"} className={buttonVariants({ size: "lg" })}>
              Explore Courses
            </Link>
            <Link
              href={"/login"}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-34">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {feature.description}
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
