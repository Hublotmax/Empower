"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface CanvasInputProps {
  value: string
  onChange: (value: string) => void
  type?: "text" | "password"
  placeholder?: string
  className?: string
}

export function CanvasInput({ value, onChange, type = "text", placeholder = "", className = "" }: CanvasInputProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw background
    ctx.fillStyle = "transparent"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw border
    ctx.strokeStyle = isFocused ? "#ffffff" : "#6b7280"
    ctx.lineWidth = 1
    ctx.strokeRect(0.5, 0.5, rect.width - 1, rect.height - 1)

    // Set text properties
    ctx.font = "14px system-ui, -apple-system, sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.textBaseline = "middle"

    const padding = 12
    const textY = rect.height / 2

    // Display text or placeholder
    const displayText = value || placeholder
    const isPlaceholder = !value && placeholder

    if (isPlaceholder) {
      ctx.fillStyle = "#9ca3af"
    }

    // Handle password masking
    const maskedText = type === "password" && value ? "•".repeat(value.length) : displayText

    if (maskedText) {
      ctx.fillText(maskedText, padding, textY)
    }

    // Draw cursor
    if (isFocused && showCursor && !isPlaceholder) {
      const textWidth = ctx.measureText(
        type === "password" && value ? "•".repeat(cursorPosition) : value.slice(0, cursorPosition),
      ).width
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(padding + textWidth, textY - 8, 1, 16)
    }
  }, [value, isFocused, cursorPosition, showCursor, type, placeholder])

  // Cursor blinking effect
  useEffect(() => {
    if (!isFocused) return

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [isFocused])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      if (cursorPosition > 0) {
        const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition)
        onChange(newValue)
        setCursorPosition(cursorPosition - 1)
      }
    } else if (e.key === "Delete") {
      e.preventDefault()
      if (cursorPosition < value.length) {
        const newValue = value.slice(0, cursorPosition) + value.slice(cursorPosition + 1)
        onChange(newValue)
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      setCursorPosition(Math.max(0, cursorPosition - 1))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setCursorPosition(Math.min(value.length, cursorPosition + 1))
    } else if (e.key === "Home") {
      e.preventDefault()
      setCursorPosition(0)
    } else if (e.key === "End") {
      e.preventDefault()
      setCursorPosition(value.length)
    } else if (e.key.length === 1) {
      e.preventDefault()
      const newValue = value.slice(0, cursorPosition) + e.key + value.slice(cursorPosition)
      onChange(newValue)
      setCursorPosition(cursorPosition + 1)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.font = "14px system-ui, -apple-system, sans-serif"
    const clickX = e.clientX - rect.left - 12 // Account for padding

    // Find cursor position based on click
    let newCursorPosition = 0
    for (let i = 0; i <= value.length; i++) {
      const textWidth = ctx.measureText(type === "password" && value ? "•".repeat(i) : value.slice(0, i)).width
      if (clickX <= textWidth) {
        newCursorPosition = i
        break
      }
      newCursorPosition = i
    }

    setCursorPosition(newCursorPosition)
    setIsFocused(true)
    // Focus the hidden input to trigger mobile keyboard
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleTouch = () => {
    setIsFocused(true)
    // Focus the hidden input to trigger mobile keyboard on touch
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const handleHiddenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setCursorPosition(e.target.value.length)
  }

  const handleHiddenInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Let the hidden input handle the input naturally
    setCursorPosition(inputRef.current?.selectionStart || 0)
  }

  const handleCanvasFocus = () => {
    setIsFocused(true)
    // Focus the hidden input to trigger mobile keyboard
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  // Update cursor position when value changes externally
  useEffect(() => {
    setCursorPosition(value.length)
  }, [value])

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleHiddenInputChange}
        onKeyDown={handleHiddenInputKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          position: "absolute",
          opacity: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        aria-label={placeholder}
      />
      <canvas
        ref={canvasRef}
        className={`w-full h-10 cursor-text ${className}`}
        tabIndex={0}
        onFocus={handleCanvasFocus}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        onTouchStart={handleTouch}
        style={{ outline: "none", pointerEvents: "none" }}
      />
    </div>
  )
}
