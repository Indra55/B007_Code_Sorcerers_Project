import Button from "./Button"

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#030303]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Startup Journey?</h2>
        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          Join thousands of solo founders who have accelerated their success with our AI-powered platform. Start your
          free trial today and experience the future of entrepreneurship.
        </p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Start Your 14-Day Free Trial</Button>
      </div>
    </section>
  )
}

export default CTA

