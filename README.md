# La Maison d'Or - Restaurant Table & Seat Booking Application

A complete, production-ready restaurant table and seat booking system built with React, TypeScript, TailwindCSS, and Next.js. This application provides an interactive visual interface where customers can select specific tables and seats on a realistic restaurant floor plan.

## 🎯 Features

- **Visual Floor Layout**: Interactive restaurant floor plan using Konva.js
- **Table Selection**: Support for round, rectangular, and square tables
- **Seat-Level Booking**: Select specific seats at each table
- **Real-Time Availability**: Check seat/table availability based on existing bookings
- **Double-Booking Prevention**: Validates against existing bookings for the same date/time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Hover effects, selection highlights, and transitions
- **Form Validation**: Comprehensive client-side validation for booking details

## 🏗️ Technical Stack

- **Frontend**: React 18, TypeScript, Next.js 14
- **Styling**: TailwindCSS
- **Canvas Rendering**: Konva.js (react-konva)
- **State Management**: React Hooks
- **Backend**: Next.js API Routes
- **Data Storage**: JSON files (easily replaceable with a database)

## 📦 Installation

### Windows Users (Recommended)

**Quick Setup:**
1. Double-click `setup.bat` - This will install everything automatically
2. Double-click `start-dev.bat` - This will start the development server
3. Open your browser to [http://localhost:3000](http://localhost:3000)

**Available Batch Files:**
- `setup.bat` - Complete first-time setup
- `start-dev.bat` - Start development server
- `build.bat` - Build for production
- `start-prod.bat` - Start production server
- `deploy.bat` - Deployment preparation
- `install.bat` - Install dependencies only

See [README_BATCH_FILES.md](README_BATCH_FILES.md) for detailed batch file documentation.

### Manual Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗺️ Restaurant Layout

The application includes a pre-configured restaurant layout with:

- **Room Size**: 800 x 600 pixels
- **Table A**: Round table (radius: 50px) with 6 seats at position (150, 150)
- **Table B**: Rectangular table (120x60px) with 4 seats at position (400, 200)
- **Table C**: Square table (80x80px) with 8 seats at position (250, 400)

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── tables/
│   │   │   └── route.ts          # GET endpoint for tables
│   │   └── book/
│   │       └── route.ts          # POST endpoint for bookings
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main booking page
├── components/
│   ├── BookingForm.tsx            # Booking form component
│   ├── RestaurantLayout.tsx       # Main layout canvas
│   ├── Seat.tsx                   # Individual seat component
│   └── TableShape.tsx             # Table shape renderer
├── data/
│   ├── tables.json                # Table definitions
│   └── bookings.json              # Booking storage (auto-generated)
├── types/
│   └── index.ts                   # TypeScript type definitions
└── README.md                      # This file
```

## 🔧 Configuration

### Adding New Tables

To add a new table, edit `data/tables.json`:

```json
{
  "id": "table-d",
  "name": "Table D",
  "shape": "round",
  "x": 500,
  "y": 300,
  "radius": 45,
  "seats": [
    { "id": 1, "x": 500, "y": 245 },
    { "id": 2, "x": 545, "y": 300 },
    { "id": 3, "x": 500, "y": 355 },
    { "id": 4, "x": 455, "y": 300 }
  ],
  "available": true
}
```

**Table Shapes**:
- `round`: Requires `radius` property
- `rectangle`: Requires `width` and `height` properties
- `square`: Requires `width` and `height` properties (typically equal)

**Seat Placement**:
- For round tables: Place seats evenly around the circumference
- For rectangular tables: Two seats per long side
- For square tables: Two seats per side

### Editing Layout

1. **Change room size**: Edit `roomWidth` and `roomHeight` in `components/RestaurantLayout.tsx`
2. **Adjust table positions**: Modify `x` and `y` coordinates in `data/tables.json`
3. **Change colors**: Update Tailwind classes or add custom colors in `tailwind.config.js`

### Adjusting Seat Count

1. Edit the `seats` array in `data/tables.json`
2. Calculate seat positions based on table geometry
3. Ensure each seat has a unique `id` within the table
4. Restart the development server to see changes

## 🔌 API Endpoints

### GET `/api/tables`

Returns all tables with their current availability status.

**Response**:
```json
[
  {
    "id": "table-a",
    "name": "Table A",
    "shape": "round",
    "x": 150,
    "y": 150,
    "radius": 50,
    "seats": [...],
    "available": true
  }
]
```

### POST `/api/book`

Creates a new booking.

**Request Body**:
```json
{
  "tableId": "table-a",
  "seatId": 1,
  "customerName": "John Doe",
  "phone": "+1 (555) 123-4567",
  "date": "2024-01-15",
  "time": "19:00",
  "numberOfGuests": 2
}
```

**Response**:
```json
{
  "success": true,
  "bookingId": "booking-1234567890-abc123",
  "message": "Booking created successfully"
}
```

## 🛡️ Double-Booking Prevention

The system prevents double-booking by:

1. **Seat-Level**: If a specific seat is selected, it checks if that exact seat is booked for the same date/time
2. **Table-Level**: If no seat is selected, it checks if the entire table is booked for the same date/time
3. **Time-Based**: Only future bookings and same-day future times are considered

Validation occurs server-side in `/app/api/book/route.ts`.

## 🎨 Styling & Customization

### Colors

- **Table Color**: `#38b000` (green) - defined in `tailwind.config.js` as `table-green`
- **Seat Color**: `#1e40af` (blue) - defined as `seat-blue`
- **Selected State**: Brighter blue with glow effect
- **Disabled State**: Grey (#9ca3af) with reduced opacity

### Animations

- Hover effects: Soft glow and stroke width increase
- Selection: Thicker outline and shadow
- Transitions: Smooth color and shadow transitions

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Considerations

- Ensure the `data/` directory is writable for bookings
- Consider replacing JSON storage with a database for production
- Add authentication/authorization as needed
- Implement rate limiting for API endpoints

## 📝 Future Enhancements

- [ ] Database integration (PostgreSQL, MongoDB, etc.)
- [ ] User authentication
- [ ] Email/SMS confirmation
- [ ] Admin dashboard for managing tables and bookings
- [ ] Calendar view for bookings
- [ ] Table capacity recommendations based on guest count
- [ ] Multiple restaurant layouts/rooms
- [ ] Real-time updates using WebSockets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🐛 Troubleshooting

### Tables not loading
- Check that `data/tables.json` exists and is valid JSON
- Verify the API route is accessible at `/api/tables`

### Bookings not saving
- Ensure the `data/` directory exists and is writable
- Check server console for error messages

### Canvas not rendering
- Verify Konva.js is installed: `npm install konva react-konva`
- Check browser console for errors

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Built with ❤️ for La Maison d'Or Restaurant**
