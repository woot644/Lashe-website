import os

# Read template
with open('C:/users/zacen/python/vibe_coding/jlm_audio/500-comps.html', 'r') as f:
    template = f.read()

header_end = template.find('<div class="breadcrumb">')
footer_start = template.find('</main>')
header = template[:header_end]
footer = template[footer_start:]

IMG = 'https://www.jlmaudio.com/shop/images/cache/'

def card(name, price, stock, img, cat=''):
    if stock == 'Out of stock':
        sc, btn = 'stock-out', '<button class="btn-add" disabled style="opacity:0.4;cursor:not-allowed;">Sold Out</button>'
        tag = '<span class="product-tag tag-oos">Out of stock</span>'
    elif '1 in stock' in stock:
        sc, btn = 'stock-low', '<button class="btn-add">Add to Cart</button>'
        tag = ''
    else:
        sc, btn = 'stock-in', '<button class="btn-add">Add to Cart</button>'
        tag = ''
    if img == 'NO_IMAGE':
        img_html = '<div style="color:var(--text-dim);font-size:0.75rem;">No Image</div>'
    else:
        img_html = f'<img src="{IMG}{img}" alt="{name}" loading="lazy">'
    return f'''
          <div class="product-card">
            <div class="product-img">{tag}{img_html}</div>
            <div class="product-info">
              <div class="product-cat">{cat}</div>
              <div class="product-name">{name}</div>
              <div class="product-stock {sc}">{stock}</div>
              <div class="product-footer">
                <div class="product-price">{price} <span class="cur">AUD</span></div>
                {btn}
              </div>
            </div>
          </div>'''

def fix_sidebar(h):
    links = {
        '500 DIY Kits': '500-diy-kits.html', 'Power Supplies and Kits': 'power-supplies.html',
        'Mic Pre Kits': 'mic-pre-kits.html', 'Compressor Kits': 'compressor-kits.html',
        'Equaliser Kits': 'equaliser-kits.html', 'VU Meter Kits': 'vu-meter-kits.html',
        'Small Interface Kits': 'small-interface-kits.html', 'Amp Kits': 'amp-kits.html',
        'Sontec / ITI Mods': 'sontec-iti-mods.html', 'Synth Mods': 'synth-mods.html',
        'Opamps': 'opamps.html', 'Audio Transformers': 'audio-transformers.html',
        'Pots and Knobs': 'pots-and-knobs.html', 'Switches': 'switches.html',
        'Other Parts': 'other-parts.html',
    }
    h = h.replace('href="#">Testing Kits', 'href="testing-kits.html">Testing Kits')
    for name, href in links.items():
        h = h.replace(f'href="#" class="sub">{name}', f'href="{href}" class="sub">{name}')
        h = h.replace(f'href="#">{name}', f'href="{href}">{name}')
    return h

def make_page(filename, title, sidebar_active, products):
    h = header.replace('500 Comps — JLM Audio', f'{title} — JLM Audio')
    h = h.replace('Shop JLM Audio 500 Comps', f'Shop JLM Audio {title}')
    h = h.replace('class="sub active"', 'class="sub"')
    h = fix_sidebar(h)
    # Set active
    h = h.replace(f'>{sidebar_active}</a>', f' class="sub active">{sidebar_active}</a>')
    cards = ''.join([card(*p) for p in products])
    content = f'''      <div class="breadcrumb">
        <a href="index.html">Home</a><span>&rsaquo;</span> {title}
      </div>
      <div class="products-section">
        <div class="products-header">
          <h3>{title} <span class="count">({len(products)} products)</span></h3>
        </div>
        <div class="product-grid">{cards}
        </div>
      </div>
    '''
    path = f'C:/users/zacen/python/vibe_coding/jlm_audio/{filename}'
    with open(path, 'w') as f:
        f.write(h + content + footer)
    print(f'Created {filename} ({len(products)} products)')

# Testing Kits
make_page('testing-kits.html', 'Testing Kits', 'Testing Kits', [
    ('500 Tester DUAL kit', '$65.45', '2 in stock', '500_TESTER_DUAL_PHOTO_BACK_640.190.jpg', 'Testing'),
    ('500 Tester kit', '$54.45', '3 in stock', '500_tester_angle_1_640.190.jpg', 'Testing'),
    ('RIBBON CABLETESTER KIT', '$53.90', '2 in stock', 'CABLE_TESTER_built.190.jpg', 'Testing'),
    ('RIBBON CABLETESTER PCB', '$16.50', '2 in stock', 'CABLE_TESTER.190.jpg', 'PCB'),
    ('500 51X Extender Cable Kit', '$43.45', '5 in stock', '51X_cable_extender_640.190.JPG', 'Testing'),
    ('500 51X Extender PCB', '$19.80', '57 in stock', '500_51X_Extender_PCB_640.190.jpg', 'PCB'),
])

# Audio Transformers
make_page('audio-transformers.html', 'Audio Transformers', 'Audio Transformers', [
    ('JLM2503 Output Transformer', '$55.00', '748 in stock', 'JLM2503_400.190.jpg', 'Transformer'),
    ('Clip for JLM14 Transformer', '$1.10', '25 in stock', 'Cable_Clip.190.png', 'Accessory'),
    ('JLM111PCB Output Transformer', '$76.45', '44 in stock', 'JLM111PCB640.190.jpg', 'Transformer'),
    ('JLM116565 Input Transformer', '$55.00', '79 in stock', 'JLM116565.190.png', 'Transformer'),
    ('JLM14 Input Transformer', '$44.00', '137 in stock', 'JLM14sm.190.jpg', 'Transformer'),
])

# Switches
make_page('switches.html', 'Switches', 'Switches', [
    ('RELAY24vDPDT', '$2.64', '95 in stock', 'RELAY24vDPDT.190.jpg', 'Relay'),
    ('RELAY12vDPDT', '$2.64', '94 in stock', 'RELAY12vDPDT.190.jpg', 'Relay'),
    ('Push Button Switch ORANGE', '$4.40', '95 in stock', 'PUSH_ALT_ORANGE.190.jpg', 'Switch'),
    ('Push Button Switch RED', '$4.40', '93 in stock', 'PUSH_ALT_RED.190.jpg', 'Switch'),
    ('Toggle DPDT PCB Centre Off long', '$5.50', '469 in stock', 'LA500A_toggle.190.jpg', 'Toggle'),
    ('Rotary Switch 3pos 4pole', '$4.40', '20 in stock', '3P4WRS.190.jpg', 'Rotary'),
    ('PEQ500 HI Cut/Boost POT SWITCH PCB', '$32.45', '19 in stock', 'PEQPOTPCB400.190.JPG', 'Switch'),
    ('PEQ500 HI BOOST POT SWITCH', '$10.45', '94 in stock', 'PEQHIPOTSW400.190.JPG', 'Switch'),
    ('Gain Switch 2x12pos', '$40.15', '4 in stock', 'Gain_Switch_400.190.JPG', 'Switch'),
    ('Toggle DPDT PCB Centre Off', '$5.50', '107 in stock', 'BA_toggle.190.gif', 'Toggle'),
    ('Toggle DPDT PCB', '$6.00', '754 in stock', 'BA_toggles.190.gif', 'Toggle'),
    ('Large Toggle DPDT PCB', '$6.60', '141 in stock', 'Large_toggle.190.jpg', 'Toggle'),
])

# Pots and Knobs
make_page('pots-and-knobs.html', 'Pots and Knobs', 'Pots and Knobs', [
    ('Fader 50k', '$3.30', '200 in stock', 'Fader.190.jpg', 'Fader'),
    ('Dual 10k Log Pot', '$8.80', '183 in stock', '100k_log_centre_detent.190.jpg', 'Pot'),
    ('Dual 10k 24mm Log Pot D Shaft', '$4.95', '4 in stock', '24mm_pot_angle.190.jpg', 'Pot'),
    ('PEQ500 HI Cut/Boost POT SWITCH PCB', '$32.45', '19 in stock', 'PEQPOTPCB400.190.JPG', 'Switch PCB'),
    ('PEQ500 HI BOOST POT SWITCH', '$10.45', '94 in stock', 'PEQHIPOTSW400.190.JPG', 'Switch'),
    ('Dual 20k Rev Log Pot Pull Switch', '$16.50', '255 in stock', 'Dual_10k_pot_pull_sw.190.jpg', 'Pot'),
    ('Dual 1k Log Pot', '$5.50', '427 in stock', '1K_Log_pot_dual.190.jpg', 'Pot'),
    ('Dual 20k Rev Log Pot', '$8.80', '691 in stock', '100k_log_centre_detent.190.jpg', 'Pot'),
    ('Dual 200k Log Pot Pull Switch', '$16.50', '421 in stock', 'Dual_10k_pot_pull_sw.190.jpg', 'Pot'),
    ('Variable Impedance Pot', '$11.00', '219 in stock', '100k_log_centre_detent.190.jpg', 'Pot'),
    ('Knob Black 15mm', '$3.30', '2266 in stock', '15mm_knob.190.JPG', 'Knob'),
    ('Knob Black Chicken Head T36', '$3.30', '1202 in stock', 'Chicken_Head_Knob_BLK.190.jpg', 'Knob'),
    ('Dual 10k 16mm Log Pot Pull Switch', '$16.50', '550 in stock', 'Dual_10k_pot_pull_sw.190.jpg', 'Pot'),
    ('500k Log Pot', '$3.30', '5 in stock', 'spline_pot.190.gif', 'Pot'),
    ('5k 25 Turn Trim Pot', '$2.20', '177 in stock', '25_turn_trim_pot.190.jpg', 'Pot'),
    ('Dual 10k Rev Log Pot', '$11.00', '189 in stock', '10k_Dual_Reverse_log_C_taper_pot_small.190.jpg', 'Pot'),
    ('10k Rev Log Pot', '$8.80', '143 in stock', 'spline_pot.190.gif', 'Pot'),
])

# Opamps (32 products)
make_page('opamps.html', 'Opamps', 'Opamps', [
    ('4136 to TL074 Adaptor', '$22.00', '19 in stock', '4136TL074.190.jpg', 'Adaptor'),
    ('DOA Solder to Sockets adaptor', '$22.00', '6 in stock', 'DOA_Solder_to_Socket_Top_400.190.jpg', 'Adaptor'),
    ('TA7136 to 990/2520 DOA adaptor', '$22.00', '26 in stock', 'TA7136_Top_400.190.jpg', 'Adaptor'),
    ('HA1457 to 990/2520 DOA adaptor', '$22.00', '30 in stock', 'HA1457_Top_400.190.jpg', 'Adaptor'),
    ('TA7322 to 990/2520 DOA adaptor', '$22.00', '26 in stock', 'TA7322_Top_400.190.jpg', 'Adaptor'),
    ('DIP8 to 2520/990 Adaptor', '$22.00', '11 in stock', 'DIP8990_top.190.jpg', 'Adaptor'),
    ('990A+ opamp', '$73.15', '41 in stock', '990A_800.190.jpg', 'Opamp'),
    ('Hybrid SMDv2 Opamp', '$53.90', '12 in stock', 'Hybrid_SMDv2.190.jpg', 'Opamp'),
    ('Twenty 5 Twenty SMD Opamp', '$49.50', '122 in stock', 'Twenty_5_Twenty.190.jpg', 'Opamp'),
    ('FLICK535 SMD Opamp', '$53.90', '19 in stock', 'FLICKSMD.190.jpg', 'Opamp'),
    ('TA7136 SMD Opamp replacement', '$22.00', '45 in stock', 'TA7136SMD.190.jpg', 'Opamp'),
    ('HS3099 Opamp', '$192.50', '5 in stock', 'HS3099_BOTTOM.190.JPG', 'Opamp'),
    ('NE5533 to 2xNE5534A Adaptor', '$22.00', '39 in stock', 'NE5533ICA3.190.JPG', 'Adaptor'),
    ('HS7000 Opamp', '$104.50', '34 in stock', 'HS7000.190.jpg', 'Opamp'),
    ('ITI to Sontec Filter', '$77.00', '6 in stock', 'ITI_SONTEC_FILTER_2.190.jpg', 'Filter'),
    ('ITI Filter Adaptor', '$55.00', '6 in stock', 'ITI_Filter_Adaptor_Discrete_2.190.jpg', 'Adaptor'),
    ('ITI Opamp Adaptor', '$99.00', '8 in stock', 'ITI_Opamp_Adaptor_800.190.jpg', 'Adaptor'),
    ('HS3030 Opamp', '$192.50', '6 in stock', 'HS3030SMD_640.190.png', 'Opamp'),
    ('DUAL to 2xSINGLE DIP8 Adaptor', '$19.80', '3 in stock', 'ADAPTORS_DUAL_640.190.JPG', 'Adaptor'),
    ('TL074 to 2xDual DIP8 Adaptor', '$22.00', '19 in stock', 'ADAPTORS_TL074_640.190.JPG', 'Adaptor'),
    ('6x1mm gold opamp pins', '$2.20', '161 in stock', '1mmpcbpin.190.jpg', 'Parts'),
    ('TA7322P &amp; HA1457 replacement opamp kit', '$27.50', '144 in stock', 'PM_Adaptor_v2_800.190.jpg', 'Kit'),
    ('BAX83AM Module', '$49.50', '4 in stock', 'BAX83AM_1_.190.jpg', 'Module'),
    ('BAX83NV Module', '$54.45', '12 in stock', 'BAX83NV_1_.190.jpg', 'Module'),
    ('Sontec HS10 SMD Opamp Adaptor', '$33.00', '13 in stock', 'HS10_Adaptor.190.jpg', 'Adaptor'),
    ('V8 Opamp Kit', '$22.00', '4 in stock', 'V8.190.jpg', 'Kit'),
    ('NE5532AP Dual Opamp', '$5.50', '118 in stock', 'dip8722.190.jpg', 'Opamp'),
    ('6x1mm Sockets', '$6.60', '172 in stock', '1mmsockets.190.jpg', 'Parts'),
    ('Hybrid Opamp Kit', '$31.90', '28 in stock', 'HybridOpampFinalBuilt.190.jpg', 'Kit'),
    ('4136 to 2xDual DIP8 Adaptor', '$22.00', '1 in stock', 'ADAPTORS_4136_640.190.JPG', 'Adaptor'),
    ('JLM99v Opamp LV', '$82.50', 'Out of stock', 'JLM99v_LV.190.png', 'Opamp'),
    ('JLM99v Opamp HV', '$82.50', '12 in stock', 'JLM99v_HV.190.png', 'Opamp'),
])

# PCBs (51 products)
make_page('pcbs.html', 'PCBs', 'PCBs', [
    ('AC/DC HV PCB', '$19.80', '6 in stock', 'ACDCHV_PCB.190.png', 'PCB'),
    ('Variable Pad PCB', '$7.15', '18 in stock', 'VAriable_PAD_PCB_800.190.png', 'PCB'),
    ('Power Plant 2 Rail PS PCB', '$22.00', '27 in stock', 'POWERPLANT_PCB.190.png', 'PCB'),
    ('DSUBHYPEX PCB', '$16.50', '5 in stock', 'DSUBHYPEX2.190.jpg', 'PCB'),
    ('STEREOBUS PCB', '$22.00', '13 in stock', 'STEREOBUS800.190.jpg', 'PCB'),
    ('EMU SP-1200 PS PCB', '$22.00', '6 in stock', 'EMU_PC395.190.png', 'PCB'),
    ('GAIN Mic Pre PCB', '$20.90', '28 in stock', 'GAIN_PCB.190.png', 'PCB'),
    ('Palpigrade 8Ch PCB', '$24.20', '25 in stock', 'palpigrade_top_pcb_630.190.jpg', 'PCB'),
    ('Tardigrade 8Ch PCB', '$24.20', '19 in stock', 'Tardigrade_PCB_Top_640.190.jpg', 'PCB'),
    ('SUM8 PCB', '$24.20', '20 in stock', 'SUM8.190.png', 'PCB'),
    ('AUX8 PCB', '$30.80', '24 in stock', 'AUX8SUM.190.jpg', 'PCB'),
    ('1290 Macro Main PCB', '$22.00', '4 in stock', '1290_Macro_PCB_800.190.jpg', 'PCB'),
    ('V6 6 Rail PS PCB', '$31.90', '4 in stock', 'V6_PCB_top_800.190.jpg', 'PCB'),
    ('RIBBON CABLETESTER PCB', '$16.50', '2 in stock', 'CABLE_TESTER.190.jpg', 'PCB'),
    ('STEREOLAB PCB', '$19.80', '23 in stock', 'STEREOLAB_TOP_640.190.jpg', 'PCB'),
    ('12PAKAMP Red PCB', '$76.45', '9 in stock', '12PAKAMP_DLCP_RED_1280.190.jpg', 'PCB'),
    ('12PAKAMP Blue PCB', '$76.45', '5 in stock', '12PAKAMP_BAL_IN_BLUE_1280.190.jpg', 'PCB'),
    ('STATTEN PCB', '$7.70', '20 in stock', 'STATTEN_TOP_1024.190.jpg', 'PCB'),
    ('DSUB4 PCB', '$9.90', '29 in stock', 'DSUB4_TOP_1024.190.jpg', 'PCB'),
    ('8Ch relay PCB', '$20.90', '26 in stock', 'IDC_relay_pcb.190.jpg', 'PCB'),
    ('FET POWER SWITCHER PCB', '$20.90', '10 in stock', 'FET_SWITCHER_PCB.190.jpg', 'PCB'),
    ('Talkback Compressor PCB', '$20.90', '81 in stock', 'Talkback_comp_pcb.190.jpg', 'PCB'),
    ('Neve Interconnector PCB', '$64.90', '12 in stock', 'NEVE_V-51_INTERCONNECTOR_pcb.190.jpg', 'PCB'),
    ('Powerstation v5 PCB', '$22.00', '34 in stock', 'Powerstation_Ver_5_PCB_front_640.190.png', 'PCB'),
    ('AC/DC v5 PCB', '$20.90', '88 in stock', 'ACDCv5_front_640.190.png', 'PCB'),
    ('MICRO DUAL SWITCH POT PCB', '$5.50', '30 in stock', 'MDSPCB.190.jpg', 'PCB'),
    ('XLR/TRS STEREO IO PCB', '$9.90', '165 in stock', 'STEREO_IO_PCB_640.190.jpg', 'PCB'),
    ('TASCAM/IDC to XLR/TRS PCB', '$20.90', '14 in stock', 'TASCAM___IDC_to_XLR___TRS.190.jpg', 'PCB'),
    ('Passive Monitor Controller PCB', '$20.90', '4 in stock', 'Passive_Controller_Ver_2_both_sides_400.190.png', 'PCB'),
    ('Hybrid Opamp PCB', '$7.70', '38 in stock', 'HYBRID_PCB_400T.190.jpg', 'PCB'),
    ('VU Buffer Peak LED PCB', '$8.80', '95 in stock', 'VUPEAK_Buffer_PCB_400.190.jpg', 'PCB'),
    ('Micro Passive Mixer PCB', '$10.45', '145 in stock', 'Micro_Passive_mixer_PCB_400.190.jpg', 'PCB'),
    ('AMP HEAD PCB', '$10.45', '25 in stock', 'AMP_HEAD_PCB_640.190.jpg', 'PCB'),
    ('KRAFTWERK PCB', '$31.90', '6 in stock', 'Kraftwerk_PCBV_640.190.jpg', 'PCB'),
    ('MONO Ver2 PCB', '$20.90', '39 in stock', 'MONOv2_PCB_500.190.jpg', 'PCB'),
    ('VU2 Stereo VU Buffer PCB', '$19.80', '101 in stock', 'VU2_Buffer_PCB_400.190.png', 'PCB'),
    ('8PAKAMP PCB', '$64.90', '3 in stock', '8PAKAMP_800.190.jpg', 'PCB'),
    ('Regurgitator PCB', '$10.45', '5 in stock', 'Regurgitator4PAK800.190.jpg', 'PCB'),
    ('Bridge and Cap PCB', '$11.00', '165 in stock', 'BRIDGE___CAP_PCB.190.JPG', 'PCB'),
    ('TREX2 PCB 8PAK', '$53.90', '23 in stock', 'TREX2_PCB_8PAK.190.JPG', 'PCB'),
    ('TREX PCB 12PAK', '$64.90', '9 in stock', 'TREX_PCB_12PAK.190.JPG', 'PCB'),
    ('dINgO Pup PCB', '$19.80', '5 in stock', 'dINgo_Pup_PCB.190.jpg', 'PCB'),
    ('JLM99MPPCBv2', '$27.50', '28 in stock', 'JLM99MBv2_800.190.jpg', 'PCB'),
    ('BAN PCB', '$19.80', '340 in stock', 'BAN_PCB.190.jpg', 'PCB'),
    ('1272/1073 Edge Connector PCB', '$11.00', '177 in stock', 'Neve_Edge_PCB_800.190.jpg', 'PCB'),
    ('dINgO PCB', '$22.00', '17 in stock', 'dINgO_Ver_3_PCB_640.190.jpg', 'PCB'),
    ('AMP PCB', '$19.80', '222 in stock', 'AMP_PCB_1_.190.jpg', 'PCB'),
    ('PowerStation PCB', '$22.00', '3 in stock', 'Powerstation_Ver_3_PCB.190.jpg', 'PCB'),
    ('AC/DC PCB', '$20.90', '18 in stock', 'ACDC_v4_640.190.jpg', 'PCB'),
    ('BA PCB', '$19.80', '17 in stock', 'BA_PCB_800_170605.190.png', 'PCB'),
    ('BAD PCB', '$20.90', '262 in stock', 'BAD_PCB.190.jpg', 'PCB'),
])

# Other Parts (37 products)
make_page('other-parts.html', 'Other Parts', 'Other Parts', [
    ('JLM 500 rack mounting bolts', '$3.30', '35 in stock', 'M3x8black.190.jpg', 'Hardware'),
    ('NV500 Green PCB Recap kit', '$16.50', '9 in stock', 'NV500_Final_GREEN_PCB.190.png', 'Kit'),
    ('Clip for JLM14 Transformer', '$1.10', '25 in stock', 'Cable_Clip.190.png', 'Accessory'),
    ('Bridge Rectifier 25A SIL', '$4.40', '14 in stock', 'GBU2510-G.190.jpeg', 'Component'),
    ('RELAY12vDPDT', '$2.64', '94 in stock', 'RELAY12vDPDT.190.jpg', 'Relay'),
    ('DUAL to 2xSINGLE DIP8 Adaptor', '$19.80', '3 in stock', 'ADAPTORS_DUAL_640.190.JPG', 'Adaptor'),
    ('TL074 to 2xDual DIP8 Adaptor', '$22.00', '19 in stock', 'ADAPTORS_TL074_640.190.JPG', 'Adaptor'),
    ('470R SIL 4 Buss Resistor', '$1.10', '12 in stock', 'AMP_HEAD_470R_SIP_PACK.190.jpg', 'Component'),
    ('LED for 34mm VU Meter', '$3.30', '72 in stock', 'meter_led.190.jpg', 'Component'),
    ('Matched Opto Pair', '$55.00', '13 in stock', 'matched_pair_optos.190.jpg', 'Component'),
    ('XLR Male Neutrik A Horizontal', '$5.50', '902 in stock', 'NC3MAH.190.jpg', 'Connector'),
    ('XLR Female Neutrik A Horizontal', '$5.50', '667 in stock', 'nc3fah0.190.jpg', 'Connector'),
    ('470uF 16v Non Polar Cap', '$1.93', '290 in stock', 'NO_IMAGE', 'Capacitor'),
    ('100uF 50v Non Polar Cap', '$1.65', '211 in stock', 'NO_IMAGE', 'Capacitor'),
    ('10uF 35v Non Polar Cap', '$0.55', '803 in stock', 'NO_IMAGE', 'Capacitor'),
    ('24vdc to 5v SMPS', '$16.50', '1 in stock', 'SPR01N-05_1_.190.jpg', 'Power'),
    ('5v to +/-12v SMPS 1W', '$16.50', '13 in stock', 'DET01L-12_1_.190.jpg', 'Power'),
    ('DB25 Shielded Cover', '$5.50', '3 in stock', 'DB25_Shielded_Cover.190.jpg', 'Connector'),
    ('DB25 Female Solder Connector', '$2.20', '13 in stock', 'DB25_Female.190.jpg', 'Connector'),
    ('DB25 Male Solder Connector', '$2.20', '2 in stock', 'DB25_Male.190.jpg', 'Connector'),
    ('Ferrite Bead for BAN kit', '$2.75', '69 in stock', 'Ferrite_Bead.190.jpg', 'Component'),
    ('2x10 Pin IDC Plugs', '$2.20', '132 in stock', '2_x_10_pin_IDC_plug.190.jpg', 'Connector'),
    ('2SK170-BL FET', '$2.75', '221 in stock', '2SK170.190.gif', 'Component'),
    ('10 Wire Ribbon Cable 50cm', '$2.20', '44 in stock', '10_wire_ribbon_cable_1_.190.jpg', 'Cable'),
    ('10 Pin IDC Plug', '$1.10', '344 in stock', '10_pin_IDC_plug.190.jpg', 'Connector'),
    ('2x9v NiMH Batteries', '$38.50', '5 in stock', '2x9v_NiMH.190.jpg', 'Battery'),
    ('Dual99v Flat Rack Front Panel', '$99.00', 'Out of stock', 'Dual99v_Flat_front_panel.190.jpg', 'Panel'),
    ('1272 Flat Rack Front Panel', '$60.50', 'Out of stock', '1272rackfront800.190.jpg', 'Panel'),
    ('Bridge Rectifier 25A', '$5.50', '61 in stock', 'bridge_rect_25A.190.png', 'Component'),
    ('8 Soft Limiter Plugs TMP8', '$55.00', '43 in stock', 'NO_IMAGE', 'Accessory'),
    ('BA4 Flat Rack Front Panel', '$60.50', '2 in stock', 'Baby_Animal_panels.190.jpg', 'Panel'),
    ('BA2 Flat Rack Front Panel', '$60.50', '1 in stock', 'Baby_Animal_panels.190.jpg', 'Panel'),
    ('PCB TRS Socket for OPA DI Kit', '$3.30', '143 in stock', 'OLDDIJACK.190.jpg', 'Connector'),
    ('6x1mm Sockets', '$6.60', '172 in stock', '1mmsockets.190.jpg', 'Parts'),
    ('470uF 50v Capacitor', '$1.65', '967 in stock', '470uF50v.190.jpg', 'Capacitor'),
    ('1000uF 50v Capacitor', '$1.65', '510 in stock', '1000uF50v.190.jpg', 'Capacitor'),
    ('4136 to 2xDual DIP8 Adaptor', '$22.00', '1 in stock', 'ADAPTORS_4136_640.190.JPG', 'Adaptor'),
])

print("\nAll 7 pages generated!")
