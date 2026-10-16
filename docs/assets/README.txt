polymux.app site assets: files still to add
============================================

Screenshots (assets/shots/). Each slot shows a labelled placeholder until its file exists;
drop a PNG in at the exact path and it appears, no HTML change needed. Light shots load
by default, the -dark file loads in dark mode (OS setting or the site's theme toggle).

  Theme shots (hero, Themes section, screenshots.html): present
    dt-desktop-light.png        dt-desktop-dark.png         1440x900 (16:10)
    dt-iphone-light.png         dt-iphone-dark.png          440x900 (frame class ar-phone-900)
    classic-desktop-light.png   classic-desktop-dark.png    2880x1800 (16:10, 2x)
    classic-iphone-light.png    classic-iphone-dark.png     440x956

  Device shots ("Everywhere you are" section): still placeholders (its iPhone frame uses
  classic-iphone-*.png)
    device-ultrawide34-light.png  device-ultrawide34-dark.png  3440x1440 (34" ultrawide)
    device-dell27-light.png       device-dell27-dark.png       2560x1440 (Dell 27" 2K)
    device-mbp14-light.png        device-mbp14-dark.png        1512x982 @2x (MacBook Pro 14")

  Images are scaled to the frame width and anchored at the top: a taller image is cropped
  at the bottom, a shorter one leaves a gap, so keep the aspect ratios above (or change
  the frame's ar-* class in the HTML). Use fixture data only: no real hostnames, tokens or pane text.

Open Graph image (not made yet)
    assets/og-image.png         1200x630, referenced by og:image on every page as
                                https://polymux.app/assets/og-image.png (absolute URL, as
                                Open Graph requires). Until it exists, link previews show
                                no image.
