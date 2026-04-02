import glob

# Map: text to find -> text to replace with
# Handle both href="#">Name and href="#" class="sub">Name patterns
replacements = [
    # Sub categories with class="sub"
    ('"#" class="sub">500 Mic Pres', '"500-mic-pres.html" class="sub">500 Mic Pres'),
    ('"#" class="sub">500 Comps', '"500-comps.html" class="sub">500 Comps'),
    ('"#" class="sub">500 EQs', '"500-eqs.html" class="sub">500 EQs'),
    ('"#" class="sub">500 Other', '"500-other.html" class="sub">500 Other'),
    ('"#" class="sub">500 DIY Kits', '"500-diy-kits.html" class="sub">500 DIY Kits'),
    ('"#" class="sub">Power Supplies and Kits', '"power-supplies.html" class="sub">Power Supplies and Kits'),
    ('"#" class="sub">Mic Pre Kits', '"mic-pre-kits.html" class="sub">Mic Pre Kits'),
    ('"#" class="sub">Compressor Kits', '"compressor-kits.html" class="sub">Compressor Kits'),
    ('"#" class="sub">Equaliser Kits', '"equaliser-kits.html" class="sub">Equaliser Kits'),
    ('"#" class="sub">VU Meter Kits', '"vu-meter-kits.html" class="sub">VU Meter Kits'),
    ('"#" class="sub">Small Interface Kits', '"small-interface-kits.html" class="sub">Small Interface Kits'),
    ('"#" class="sub">Amp Kits', '"amp-kits.html" class="sub">Amp Kits'),
    ('"#" class="sub">Sontec / ITI Mods', '"sontec-iti-mods.html" class="sub">Sontec / ITI Mods'),
    ('"#" class="sub">Synth Mods', '"synth-mods.html" class="sub">Synth Mods'),
    ('"#" class="sub">Opamps', '"opamps.html" class="sub">Opamps'),
    ('"#" class="sub">Audio Transformers', '"audio-transformers.html" class="sub">Audio Transformers'),
    ('"#" class="sub">PCBs<', '"pcbs.html" class="sub">PCBs<'),
    ('"#" class="sub">Pots and Knobs', '"pots-and-knobs.html" class="sub">Pots and Knobs'),
    ('"#" class="sub">Switches', '"switches.html" class="sub">Switches'),
    ('"#" class="sub">Other Parts', '"other-parts.html" class="sub">Other Parts'),
    # Sub with active class
    ('"#" class="sub active">500 Mic Pres', '"500-mic-pres.html" class="sub active">500 Mic Pres'),
    ('"#" class="sub active">500 Comps', '"500-comps.html" class="sub active">500 Comps'),
    ('"#" class="sub active">500 EQs', '"500-eqs.html" class="sub active">500 EQs'),
    ('"#" class="sub active">500 Other', '"500-other.html" class="sub active">500 Other'),
    ('"#" class="sub active">500 DIY Kits', '"500-diy-kits.html" class="sub active">500 DIY Kits'),
    ('"#" class="sub active">Power Supplies', '"power-supplies.html" class="sub active">Power Supplies'),
    ('"#" class="sub active">Mic Pre Kits', '"mic-pre-kits.html" class="sub active">Mic Pre Kits'),
    ('"#" class="sub active">Compressor Kits', '"compressor-kits.html" class="sub active">Compressor Kits'),
    ('"#" class="sub active">Equaliser Kits', '"equaliser-kits.html" class="sub active">Equaliser Kits'),
    ('"#" class="sub active">VU Meter Kits', '"vu-meter-kits.html" class="sub active">VU Meter Kits'),
    ('"#" class="sub active">Small Interface Kits', '"small-interface-kits.html" class="sub active">Small Interface Kits'),
    ('"#" class="sub active">Amp Kits', '"amp-kits.html" class="sub active">Amp Kits'),
    ('"#" class="sub active">Sontec / ITI Mods', '"sontec-iti-mods.html" class="sub active">Sontec / ITI Mods'),
    ('"#" class="sub active">Synth Mods', '"synth-mods.html" class="sub active">Synth Mods'),
    ('"#" class="sub active">Opamps', '"opamps.html" class="sub active">Opamps'),
    ('"#" class="sub active">Audio Transformers', '"audio-transformers.html" class="sub active">Audio Transformers'),
    ('"#" class="sub active">PCBs<', '"pcbs.html" class="sub active">PCBs<'),
    ('"#" class="sub active">Pots and Knobs', '"pots-and-knobs.html" class="sub active">Pots and Knobs'),
    ('"#" class="sub active">Switches', '"switches.html" class="sub active">Switches'),
    ('"#" class="sub active">Other Parts', '"other-parts.html" class="sub active">Other Parts'),
    # Direct links (no class="sub")
    ('href="#">500 Racks', 'href="500-racks.html">500 Racks'),
    ('href="#">Mic Pres', 'href="mic-pres.html">Mic Pres'),
    ('href="#">Equalisers', 'href="equalisers.html">Equalisers'),
    ('href="#">Compressors', 'href="compressors.html">Compressors'),
    ('href="#">Amplifiers', 'href="amplifiers.html">Amplifiers'),
    ('href="#">Testing Kits', 'href="testing-kits.html">Testing Kits'),
    # Parent headers with style
    ('"#" style="font-weight:600;">500 Modules', '"500-mic-pres.html" style="font-weight:600;">500 Modules'),
    ('"#" style="font-weight:600;">DIY Kits', '"500-diy-kits.html" style="font-weight:600;">DIY Kits'),
    ('"#" style="font-weight:600;">Mod Kits', '"sontec-iti-mods.html" style="font-weight:600;">Mod Kits'),
    ('"#" style="font-weight:600;">PCBs and Parts', '"opamps.html" style="font-weight:600;">PCBs and Parts'),
    # Main nav
    ('href="#">500 Series', 'href="500-mic-pres.html">500 Series'),
    ('href="#">DIY Kits', 'href="500-diy-kits.html">DIY Kits'),
    ('href="#">PCBs &amp; Parts', 'href="pcbs.html">PCBs &amp; Parts'),
    # Footer
    ('href="#">500 Series Modules', 'href="500-mic-pres.html">500 Series Modules'),
]

files = glob.glob('C:/users/zacen/python/vibe_coding/jlm_audio/*.html')
fixed_count = 0

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        fixed_count += 1
        print(f'Fixed {filepath.split(chr(92))[-1] if chr(92) in filepath else filepath.split("/")[-1]}')

# Verify
remaining = 0
for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    # Count sidebar href="#" (exclude info section, account, etc)
    for line in content.split('\n'):
        if 'href="#"' in line and any(cat in line for cat in ['500 ', 'Mic Pre', 'Compressor', 'Equaliser', 'VU Meter', 'Small Interface', 'Amp Kit', 'Sontec', 'Synth', 'Testing', 'Opamp', 'Audio Trans', 'PCBs', 'Pots', 'Switch', 'Other Part', 'Amplifier', 'Mod Kit', 'DIY']):
            remaining += 1

print(f'\nFixed {fixed_count} files. Remaining product category broken links: {remaining}')
