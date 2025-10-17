import { SignUp } from '@clerk/nextjs'

const brutalistAppearance = {
  elements: {
    rootBox: 'w-full max-w-md',
    card: 'bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    headerTitle: 'text-2xl font-black tracking-tighter text-black',
    headerSubtitle: 'text-gray-600 font-mono text-sm',
    formFieldInput: 
      'border-2 border-black bg-white focus:border-black focus:ring-2 focus:ring-black font-mono',
    formButtonPrimary: 
      'bg-black text-white border-2 border-black font-mono font-bold hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-0.5 hover:translate-y-0.5 transition-all',
    socialButtonsBlockButton: 
      'border-2 border-black bg-white font-mono hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    footerActionText: 'text-gray-600 font-mono text-sm',
    footerActionLink: 'text-black font-mono font-bold hover:text-gray-800'
  }
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <SignUp
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        routing="path"
        path="/sign-up"
        appearance={brutalistAppearance}
      />
    </div>
  )
}