import Discord from '@helsa/ui/components/icons/discord';
import Github from '@helsa/ui/components/icons/github';
import ProductHunt from '@helsa/ui/components/icons/product-hunt';
import X from '@helsa/ui/components/icons/x';

export function SocialLinks() {
  return (
    <ul className="flex space-x-4 items-center md:ml-5">
      <li>
        <a target="_blank" rel="noreferrer" href="https://x.com/helsa-health">
          <span className="sr-only">Twitter</span>
          <X className="fill-[#878787]" />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noreferrer" href="https://github.com/Duccem/Helsa">
          <span className="sr-only">Producthunt</span>
          <ProductHunt className="fill-[#878787]" />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noreferrer" href="https://github.com/Duccem/Helsa">
          <span className="sr-only">Discord</span>
          <Discord className="fill-[#878787]" />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noreferrer" href="https://github.com/Duccem/Helsa">
          <span className="sr-only">Github</span>
          <Github className="fill-[#878787]" />
        </a>
      </li>
    </ul>
  );
}
