import { Checkjs } from './checkjs';

export const fieldConfigurations = [
    // --- CIVIC CATEGORY INPUTS ---
    // [ID, Label, Type, isRequired, CheckFunction, Message, Options]
    ['Civic_Subcategory', 'Issue Type', 'select', true, Checkjs.Dropdown, 'Please pick a subcategory from the list.', [
        { value: 'pothole', text: 'Pothole' },
        { value: 'drainage', text: 'Drainage' },
        { value: 'streetlight', text: 'Streetlight' },
        { value: 'water', text: 'Water' },
        { value: 'garbage', text: 'Garbage' },
        { value: 'illegal_construction', text: 'Illegal Construction' },
        { value: 'stray', text: 'Stray' },
        { value: 'noise', text: 'Noise' },
        { value: 'tree', text: 'Tree' }
    ]],
    ['Civic_Photo', 'Camera Photo', 'file', true, Checkjs.ImageUpload, 'Camera photo is required.'],
    ['Civic_Location', 'Location', 'text', true, Checkjs.Address, 'Please provide map drop or GPS.'],
    ['Civic_Description', 'Description', 'text', false, Checkjs.TextOptional, 'Optional. Maximum 280 characters.'], // Optional

    // --- ASK CATEGORY INPUTS ---
    ['Ask_NeedType', 'Need Type', 'text', true, Checkjs.Text, 'Please describe what you need.'],
    ['Ask_Urgency', 'Urgency', 'radio', true, Checkjs.Radio, 'Please select urgency: now, today, or this week.', [
        { value: 'now', text: 'Now' },
        { value: 'today', text: 'Today' },
        { value: 'this_week', text: 'This Week' }
    ]],
    ['Ask_Deadline', 'Deadline', 'date', true, Checkjs.Date, 'Please pick a deadline or derive from urgency.'],
    ['Ask_ContactMethod', 'Contact Method', 'select', true, Checkjs.Dropdown, 'Select in app, call, or whatsapp.', [
        { value: 'in_app', text: 'In App' },
        { value: 'call', text: 'Call' },
        { value: 'whatsapp', text: 'WhatsApp' }
    ]],
    ['Ask_Description', 'Description', 'text', false, Checkjs.TextOptional, 'Optional description.'], // Optional

    // --- LISTING CATEGORY INPUTS ---
    ['Listing_Item', 'Item Name', 'text', true, Checkjs.Text, 'Please type the title of the item.'],
    ['Listing_Price', 'Price and Type', 'text', true, Checkjs.Price, 'Provide number plus fixed, negotiable, or free.'],
    ['Listing_Condition', 'Condition', 'select', true, Checkjs.Dropdown, 'Please pick the condition.', [
        { value: 'new', text: 'New' },
        { value: 'used', text: 'Used' }
    ]],
    ['Listing_Photos', 'Upload Photos', 'file', true, Checkjs.ImageUploadMultiple, 'One to four photos required.'],
    ['Listing_PickupTerms', 'Pickup Terms', 'select', true, Checkjs.Dropdown, 'Please pick pickup terms.', [
        { value: 'pickup', text: 'Pickup' },
        { value: 'dropoff', text: 'Drop-off' }
    ]],

    // --- EVENT CATEGORY INPUTS ---
    ['Event_Venue', 'Venue', 'text', true, Checkjs.Text, 'Pick from Place or type.'],
    ['Event_StartsEnds', 'Starts at / Ends at', 'datetime-local', true, Checkjs.DateTime, 'Please use the picker.'],
    ['Event_Recurrence', 'Recurrence', 'text', false, Checkjs.TextOptional, 'Optional recurrence rule.'], // Optional
    ['Event_PriceCapacity', 'Price & Capacity', 'text', false, Checkjs.TextOptional, 'Optional price and capacity.'], // Optional

    // --- DEAL CATEGORY INPUTS ---
    ['Deal_OfferText', 'Offer Text', 'text', true, Checkjs.Text, 'Type the title.'],
    ['Deal_ValidFromUntil', 'Valid From and Until', 'datetime-local', true, Checkjs.DateTime, 'Picker is required.'],
    ['Deal_ValidDaysHours', 'Valid Days and Hours', 'text', false, Checkjs.TextOptional, 'Optional. Drives daily cycle.'], // Optional
    ['Deal_Redemption', 'Redemption Method', 'select', true, Checkjs.Dropdown, 'Walk in, code, or show screen.', [
        { value: 'walk_in', text: 'Walk In' },
        { value: 'code', text: 'Code' },
        { value: 'show_screen', text: 'Show Screen' }
    ]],
    ['Deal_ClaimCap', 'Claim Cap', 'number', false, Checkjs.NumberOptional, 'Optional claim cap.'], // Optional

    // --- MOMENT CATEGORY INPUTS ---
    ['Moment_Photo', 'Camera Photo', 'file', true, Checkjs.ImageUpload, 'Camera photo is required.'],
    ['Moment_Caption', 'Caption', 'text', true, Checkjs.Text, 'Typed caption, maximum 90 characters.'],

    // --- LOCATION MODULE INPUTS ---
    ['Location_HowPlaced', 'How it was placed', 'select', true, Checkjs.Dropdown, 'Standing here, drop on map, or pick venue.', [
        { value: 'standing', text: 'Standing Here' },
        { value: 'drop_map', text: 'Drop on Map' },
        { value: 'pick_venue', text: 'Pick a Venue' }
    ]],
    ['Location_Street', 'Street', 'select', true, Checkjs.Dropdown, 'Confirm from closed list of streets.'],
    ['Location_Landmark', 'Landmark', 'text', false, Checkjs.TextOptional, 'Optional, typed, 40 character limit.'], // Optional
    ['Location_VenueBecomesPlace', 'Venue Becomes Place', 'select', true, Checkjs.Dropdown, 'Pick from Places (Event, Deal, Place only).'],

    // --- TIME MODULE INPUTS ---
    ['Time_Urgency', 'Urgency', 'radio', true, Checkjs.Radio, 'Three taps, not a picker: now, today, this week.', [
        { value: 'now', text: 'Now' },
        { value: 'today', text: 'Today' },
        { value: 'this_week', text: 'This Week' }
    ]],
    ['Time_StartAndEnd', 'Start and End', 'datetime-local', true, Checkjs.DateTime, 'Picker for Event and Deal only.'],
    ['Time_Recurrence', 'Recurrence', 'text', false, Checkjs.TextOptional, 'Optional rule (Weekly, weekdays, day set).'], // Optional
    ['Time_OpeningHours', 'Opening Hours', 'text', false, Checkjs.TextOptional, 'Days of the Week plus ranges.'] // Optional
];