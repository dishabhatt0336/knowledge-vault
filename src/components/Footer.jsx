

/**
 * @typedef {Object} MenuItem
 * @property {string} title
 * @property {Array<{text: string, url: string}>} links
 */

/**
 * @typedef {Object} FooterProps
 * @property {{url: string, src: string, alt: string, title: string}} [logo]
 * @property {string} [tagline]
 * @property {MenuItem[]} [menuItems]
 * @property {string} [copyright]
 * @property {Array<{text: string, url: string}>} [bottomLinks]
 */

/**
 * @param {FooterProps} props
 */
const Footer = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "Knowledge Vault",
    title: "HackHub",
    url: "https://www.hackhub.com",
  },
  tagline = "Build the future together.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Features", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Documentation", url: "#" },
        { text: "API", url: "#" },
        { text: "Changelog", url: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { text: "Discord", url: "#" },
        { text: "GitHub", url: "#" },
        { text: "Twitter", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Events", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Contact", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Press", url: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Knowledge Vault. All rights reserved.`,
  bottomLinks = [
    { text: "Privacy Policy", url: "#" },
    { text: "Terms of Service", url: "#" },
    { text: "Cookie Policy", url: "#" },
  ],
} = {}) => {
  return (
    <footer className="relative w-full bg-black/40 backdrop-blur-md border-t border-white/10">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Logo Section */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                
                <p className="mt-3 text-sm text-gray-300">{tagline}</p>
              </div>
            </div>

            {/* Menu Items */}
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        className="text-sm text-gray-300 hover:text-purple-400 transition-colors duration-300"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Bottom Section */}
        <div className="py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-gray-400">{copyright}</p>
          <ul className="flex flex-wrap gap-6">
            {bottomLinks.map((link, linkIdx) => (
              <li key={linkIdx}>
                <a
                  href={link.url}
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gradient overlay accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
    </footer>
  );
};

export default Footer;