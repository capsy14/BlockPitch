"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import Image from "next/image";
import { Trash2, Building2, User, FileText } from "lucide-react";

interface Startup {
  _id: string;
  startupName: string;
  founderName?: string;
  description?: string;
  industry?: string;
  image?: string;
}

const MotionCard = motion(Card);

const MyStartups = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStartups() {
      try {
        const res = await fetch("/api/my-startups");
        const data = await res.json();
        setStartups(data);
      } catch (error) {
        console.error("Failed to fetch startups:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStartups();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/my-startups/${id}`, { method: "DELETE" });
      if (res.ok) {
        setStartups((prev) => prev.filter((s) => s._id !== id));
      } else {
        throw new Error("Failed to delete startup");
      }
    } catch (error) {
      console.error("Error deleting startup:", error);
    }
  };

  const startupList = Array.isArray(startups) ? startups : [];

  if (loading) {
    return (
      <div className="py-8 w-full">
        <motion.h1
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Startups
        </motion.h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full" />
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">My Startups</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {startupList.length > 0 ? (
          startupList.map((startup) => (
            <Card
              key={startup._id}
              className="overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={startup.image || "/image.png"}
                    alt={startup.startupName}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-lg line-clamp-1">{startup.startupName}</h2>
                  {startup.industry && (
                    <Badge variant="secondary" className="ml-2">
                      <Building2 className="h-3 w-3 mr-1" />
                      {startup.industry}
                    </Badge>
                  )}
                </div>
                {startup.founderName && (
                  <div className="flex items-center text-muted-foreground mb-2 text-sm">
                    <User className="h-4 w-4 mr-1" />
                    <span>{startup.founderName}</span>
                  </div>
                )}
                {startup.description && (
                  <div className="mt-2 text-muted-foreground text-sm">
                    <FileText className="h-4 w-4 mr-1 inline-block" />
                    <span className="line-clamp-3">{startup.description}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your startup "{startup.startupName}"
                        and remove the data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(startup._id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-muted rounded-full p-6 mb-4">
              <Building2 className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No startups found</h3>
            <p className="text-muted-foreground mb-6">You haven't added any startups yet.</p>
            <Button>Add Your First Startup</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStartups;