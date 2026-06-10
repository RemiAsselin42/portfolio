import Shaderize, { type ShaderizeProps } from './Shaderize';

/**
 * Îlot React (client:only) du hero : « shaderise » le `<h1>` en place.
 *
 * Délègue à {@link Shaderize} qui cible le titre par sélecteur, le capture en
 * texture et superpose l'effet. Le vrai `<h1>` reste en SSR (SEO/a11y) ;
 * `prefers-reduced-motion` → texte normal, pas d'overlay.
 *
 * Défauts du hero (mode `squares` + glitch, `resolution` = colonnes) surchargeables
 * par props depuis `index.astro`.
 */
export default function HeroShader({
  selector = 'h1.hero__title',
  mode = 'squares',
  glitch = true,
  resolution = 120,
  ...rest
}: Partial<ShaderizeProps> = {}) {
  return <Shaderize selector={selector} mode={mode} glitch={glitch} resolution={resolution} {...rest} />;
}
