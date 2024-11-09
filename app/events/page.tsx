'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { PawPrint, MapPin, Users, Calendar, Clock } from 'lucide-react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const mockEvents = [
  {
    id: 1,
    name: 'Paws in the Park Festival',
    location: 'Central Park Dog Run',
    date: '2024-04-15',
    time: '2:00 PM',
    description: 'Join us for the biggest dog festival of the year!',
    attendees: 45,
  },
  {
    id: 2,
    name: 'Puppy Training Workshop',
    location: 'Downtown Pet Center',
    date: '2024-04-20',
    time: '11:00 AM',
    description: 'Expert-led training session for puppies under 6 months.',
    attendees: 15,
  },
  {
    id: 3,
    name: 'Bark & Brunch Social',
    location: 'Wagging Tail Café',
    date: '2024-04-25',
    time: '10:30 AM',
    description: 'A social brunch event for dogs and their humans.',
    attendees: 25,
  },
]

export default function EventsPage() {
    const [events] = useState(mockEvents)
  
    return (
      <div className="container mx-auto p-4 flex flex-col items-center min-h-screen pt-20">
        <h1 className="text-4xl font-bold mb-12 text-center">Upcoming Events</h1>
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              variants={fadeIn}
              whileHover={{ 
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="w-full"
            >
              <Card className="overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <div className="flex items-center gap-2">
                    <PawPrint className="h-5 w-5 text-blue-200" />
                    <CardTitle className="text-white text-lg">{event.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>{event.time}</span>
                    </div>
  
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>{event.location}</span>
                    </div>
  
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>{event.attendees} attending</span>
                    </div>
  
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                        Join Event
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }