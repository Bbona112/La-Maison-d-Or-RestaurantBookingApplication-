# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## ✨ First Booking

1. **Click on a table** in the floor plan (left side)
2. **Optionally click on a seat** to select a specific seat
3. **Fill out the booking form** (right side):
   - Enter your name
   - Enter phone number
   - Select date (must be today or future)
   - Select time (11:00 - 22:00, every 30 minutes)
   - Enter number of guests
4. **Click "Confirm Booking"**
5. **See success message** with your booking ID

## 🎯 Key Features to Try

- **Hover over tables**: See the highlight effect
- **Click different tables**: Notice the selection changes
- **Click seats**: Select specific seats at a table
- **Try double-booking**: Select the same table/seat for the same date/time to see validation
- **Responsive design**: Resize your browser to see mobile layout

## 📝 Notes

- Bookings are stored in `data/bookings.json`
- Tables configuration is in `data/tables.json`
- The data directory is created automatically on first booking

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Use a different port
PORT=3001 npm run dev
```

**Tables not showing?**
- Check browser console for errors
- Verify `data/tables.json` exists and is valid JSON

**Can't create booking?**
- Ensure `data/` directory is writable
- Check server console for error messages


