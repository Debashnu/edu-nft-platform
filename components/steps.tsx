import React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

type StepStatus = "upcoming" | "current" | "complete"

interface StepProps {
  title: string
  description?: string
  status?: StepStatus
  icon?: React.ReactNode
}

interface StepsProps {
  activeStep: number
  children: React.ReactNode
  className?: string
}

export function Steps({ activeStep, children, className }: StepsProps) {
  const childrenArray = React.Children.toArray(children)
  const steps = childrenArray.map((step, index) => {
    if (React.isValidElement(step)) {
      return React.cloneElement(step, {
        status: index < activeStep ? "complete" : index === activeStep ? "current" : "upcoming",
      })
    }
    return step
  })

  return <div className={cn("space-y-4", className)}>{steps}</div>
}

export function Step({ title, description, status = "upcoming", icon }: StepProps) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border text-center",
            status === "complete" && "bg-primary border-primary text-primary-foreground",
            status === "current" && "border-primary text-primary",
            status === "upcoming" && "border-muted-foreground text-muted-foreground",
          )}
        >
          {status === "complete" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            icon || <span className="h-4 w-4 flex items-center justify-center">{}</span>
          )}
        </div>
        {status !== "upcoming" && <div className="h-full w-px bg-primary" />}
        {status === "upcoming" && <div className="h-full w-px bg-muted-foreground/30" />}
      </div>
      <div className="pb-8 pt-1">
        <h3
          className={cn(
            "text-base font-medium",
            status === "complete" && "text-foreground",
            status === "current" && "text-foreground",
            status === "upcoming" && "text-muted-foreground",
          )}
        >
          {title}
        </h3>
        {description && (
          <p
            className={cn(
              "text-sm",
              status === "complete" && "text-muted-foreground",
              status === "current" && "text-muted-foreground",
              status === "upcoming" && "text-muted-foreground/70",
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

