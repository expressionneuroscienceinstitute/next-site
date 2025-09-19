"use client"

import { useEffect } from "react"

const POPUP_SCRIPT_ID = "donorbox-popup-button-installer"
const POPUP_SCRIPT_SRC = "https://donorbox.org/install-popup-button.js"

export default function DonorboxPopupButton() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const existingScript = document.getElementById(POPUP_SCRIPT_ID)
    if (existingScript) {
      return
    }

    const script = document.createElement("script")
    script.id = POPUP_SCRIPT_ID
    script.src = POPUP_SCRIPT_SRC
    script.defer = true
    script.dataset.href = "https://donorbox.org/expression-neuroscience-institute?default_interval=q&amount=1&hide_donation_meter=true"
    script.dataset.style = "background: #130124; color: #fff; text-decoration: none; font-family: Verdana, sans-serif; display: flex; gap: 8px; width: fit-content; font-size: 16px; border-radius: 0 0 5px 5px; line-height: 24px; position: fixed; top: 50%; transform-origin: center; z-index: 9999; overflow: hidden; padding: 8px 22px 8px 18px; left: 20px; transform: translate(-50%, -50%) rotate(-90deg)"
    script.dataset.buttonCta = "Donate"
    script.dataset.imgSrc = "https://donorbox.org/images/white_logo.svg"
    script.dataset.reminderWidgetEnabled = "true"

    document.body.appendChild(script)
  }, [])

  return null
}
