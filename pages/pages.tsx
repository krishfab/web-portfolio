"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Twitter,
  Download,
  ChevronDown,
  Star,
  Code,
  Palette,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - replace with your actual projects
const projects = [
  {
    id: 1,
    title: "E-commerce Platform (ON-GOING)",
    description:
      "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
    image: "/placeholder.svg?height=300&width=500&text=E-commerce+Platform",
    technologies: ["React", "Node.js", "MongoDB", "CSS"],
    githubUrl: "https://github.com/krishfab/E-Commerce-Full-Stack.com",
    liveUrl: "http://zuitt-bootcamp-prod-551-8849-fabonan.s3-website.us-east-1.amazonaws.com",
    featured: true,
  },
  {
    id: 2,
    title: "RAD Architectural Design Studio (ON-GOING)",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/RADArchitectural.JPG",
    technologies: ["Next.js", "Express.js",  "PostgreSQL" ],
    githubUrl: "https://github.com/yourusername/taskmanager",
    liveUrl: "https://your-taskmanager-demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Weather Dashboard ()",
    description:
      "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "/placeholder.svg?height=300&width=500&text=Weather+Dashboard",
    technologies: ["JavaScript", "API Integration", "Chart.js", "CSS3"],
    githubUrl: "https://github.com/yourusername/weather",
    liveUrl: "https://your-weather-demo.com",
    featured: false,
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js and featuring smooth animations and optimized performance.",
    image: "/placeholder.svg?height=300&width=500&text=Portfolio+Website",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://your-portfolio.com",
    featured: false,
  },
  {
    id: 5,
    title: "Airline Booking System (ON-GOING)",
    description:
      "Conceptual design showcasing an intuitive UI for flight search, seat selection, and booking confirmation, focusing on user experience and workflow efficiency.",
    image: "/AirlineBooking.JPG",
    technologies: ["CSS", "JavaScript", "HTML", "MongoDB", "Express.js", "Node.js"],
    githubUrl: "https://github.com/AlvinJohnB/MCP-Side-Project",
    liveUrl: "https://alvinjohnb.github.io/MCP-Side-Project/index.html",
    featured: true,
  },
  // {
  //   id: 6,
  //   title: "Airline Booking System",
  //   description:
  //     "A recipe discovery app with ingredient-based search, nutritional information, and meal planning features.",
  //   image: "/placeholder.svg?height=300&width=500&text=Recipe+Finder",
  //   technologies: ["React Native", "Redux", "API Integration", "SQLite"],
  //   githubUrl: "https://github.com/yourusername/recipe-finder",
  //   liveUrl: "https://your-recipe-demo.com",
  //   featured: false,
  // },
]

const skills = [
  { name: "JavaScript", level: 95, icon: "🟨" },
  { name: "React", level: 85, icon: "⚛️" },
  { name: "Node.js", level: 85, icon: "🟢" },
  // { name: "Python", level: 90, icon: "🐍" },
  { name: "MongoDB", level: 85, icon: "🍃" },
  { name: "TypeScript", level: 50, icon: "🔷" },
  { name: "Next.js", level: 50, icon: "▲" },
  { name: "CSS", level: 90, icon: "🎨" },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              KrishaFab
            </div>

            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section ? "text-purple-600 font-semibold" : "text-gray-600 hover:text-purple-500"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Image
                  src="/Mypicture.jpg"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Hello, I'm Krisha!
            </span>
            {/* <br />
            <span className="text-gray-800">Krisha -Mae Fabonan</span> */}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A passionate <span className="text-purple-600 font-semibold">Full-Stack Developer</span> who loves creating
            beautiful, functional, and user-friendly digital experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 bg-transparent"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/krishfab"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Github className="w-6 h-6 text-gray-700" />
            </a>
            <a
              href="https://www.linkedin.com/in/krishfab/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href="mailto:iglesia.krisha1607@gmail.com"
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-6 h-6 text-red-500" />
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate about creating digital experiences that make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
          Hi! My name is Krisha, and I’m 27 years old, currently living in Quezon City. I’m a naturally curious person who loves stepping out of my comfort zone because 
          I believe that true growth happens when we challenge ourselves. 
          I’m passionate about exploring new ideas, places, and experiences, always eager to learn and grow
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
               This mindset has guided me throughout my diverse career—starting in customer service, sales and marketing, and administrative roles—where I developed strong communication, problem-solving, and organizational skills. 
               Over time, my curiosity for technology and passion for continuous learning inspired me to pivot into the tech industry. Now, I’m focused on building a career where I can combine my people-centered experience with technical skills to create meaningful solutions and contribute to innovative teams.
              </p>

              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Clean Code</h3>
                  <p className="text-sm text-gray-600">Writing maintainable and scalable code</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">UI/UX Design</h3>
                  <p className="text-sm text-gray-600">Creating beautiful user experiences</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Performance</h3>
                  <p className="text-sm text-gray-600">Optimizing for speed and efficiency</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 rounded-2xl bg-gradient-to-r from-purple-200 to-pink-200 flex items-center justify-center">
                <Image
                  src="/AboutMe.jpg"
                  alt="About me"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Here are some of my favorite projects that showcase my skills and passion for development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">{project.title}</CardTitle>
                  <CardDescription className="text-gray-600">{project.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-purple-100 text-purple-700">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Projects Grid */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">More Projects</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-gray-800">{project.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Technologies I love working with and continuously learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <Card
                key={skill.name}
                className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{skill.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{skill.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{skill.level}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="container mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's create something amazing together!
            </p>
          </div>
{/* EMAIL */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">iglesia.krisha1607@gmail.com</p>
                      </div>
                    </div>
{/* LINKEDIN */}
                    <div className="flex items-start sm:items-center space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center">
                        <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                         </div>
                          <div className="text-left">
                           <h3 className="font-semibold text-gray-800 text-sm sm:text-base">LinkedIn</h3>
                           <p className="text-gray-600 text-sm sm:text-base break-all">https://www.linkedin.com/in/krishfab/</p>
                       </div>
                     </div>
{/* GITHUB */}
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 flex items-center justify-center">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-800">GitHub</h3>
                        <p className="text-gray-600">https://github.com/krishfab</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      onClick={() => window.open("mailto:your.email@example.com", "_blank")}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                      onClick={() => window.open("/resume.pdf", "_blank")}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Button>

                    <div className="flex justify-center space-x-4 pt-4">
                      <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 text-white hover:shadow-lg transition-all duration-300 hover:scale-110"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                     
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white/50 border-t border-purple-100">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2025 Krisha -Mae Fabonan. Made with <span className="text-red-500 animate-pulse">❤️</span> and lots of{" "}
            <span className="text-purple-600">☕</span>
          </p>
          <p>© All rights reserved</p>
        </div>
      </footer>
    </div>
  )
}
