import { Facebook, Twitter, Linkedin, MessageCircle, Mail, MessageSquare, Bug } from 'lucide-react';

export function SocialSharing() {
  const shareUrls = {
    facebook: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fquickresizer.com&quote=%E2%9C%A8%20Resizing%20images%20made%20simple!%20Whether%20it%27s%20for%20social%20media%2C%20presentations%2C%20or%20websites%2C%20QuickResizer.com%20gets%20it%20done%20in%20seconds.%20It%27s%20quick%2C%20free%2C%20and%20super%20easy%20to%20use!",
    twitter: "https://twitter.com/intent/tweet?text=Hey!%20Need%20a%20fast%2C%20free%20tool%20to%20resize%20your%20images%3F%20Try%20QuickResizer.com%20%E2%80%93%20perfect%20for%20all%20your%20image%20resizing%20needs!%20%F0%9F%9A%80&url=https%3A%2F%2Fquickresizer.com",
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fquickresizer.com",
    whatsapp: "https://api.whatsapp.com/send?text=Hi!%20Check%20out%20QuickResizer.com%20for%20all%20your%20image%20resizing%20needs.%20It%27s%20fast%2C%20free%2C%20and%20works%20like%20a%20charm.%20Perfect%20for%20social%20media%2C%20work%2C%20or%20personal%20projects!%20%F0%9F%8E%89%20https%3A%2F%2Fquickresizer.com",
    email: "mailto:?subject=Check%20out%20QuickResizer!&body=Need%20to%20resize%20images%20quickly%3F%20Visit%20QuickResizer.com%20%E2%80%93%20the%20easiest%20and%20fastest%20way%20to%20adjust%20your%20image%20dimensions.%20https%3A%2F%2Fquickresizer.com"
  };

  const feedbackUrls = {
    feedback: "https://forms.gle/6Qo1UUEPu2kAwmw9A",
    report: "https://forms.gle/HBM6J4XUejLJ7paZA"
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Enjoyed using our app? Share the love! ❤️
        </h3>
        <p className="text-gray-600">Tell your friends about us and help them discover it too.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Share on Facebook
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors inline-flex items-center"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </a>
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center"
        >
          <Linkedin className="w-4 h-4 mr-2" />
          Share on LinkedIn
        </a>
        <a
          href={shareUrls.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Share on WhatsApp
        </a>
        <a
          href={shareUrls.email}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors inline-flex items-center"
        >
          <Mail className="w-4 h-4 mr-2" />
          Share via Email
        </a>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">OR</p>
        <p className="text-lg font-semibold text-gray-900 mb-2">Help us improve 😊🙏</p>
        <p className="text-gray-600 mb-4">Your honest feedback helps us grow. Don't be shy!</p>
        <div className="flex justify-center gap-4">
          <a
            href={feedbackUrls.feedback}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Feedback
          </a>
          <a
            href={feedbackUrls.report}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
          >
            <Bug className="w-4 h-4 mr-2" />
            Report issue
          </a>
        </div>
      </div>
    </div>
  );
}
