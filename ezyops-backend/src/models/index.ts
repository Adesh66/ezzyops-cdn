export interface Hotel {
  id: string;
  name: string;
  location: string;           // freeform or "City, Country"
  entitlements: string[];     // ["dining","spa","laundry","amenities"]
  createdAt: Date;
}

export interface Guest {
  id: string;
  name?: string;
  roomNumber?: string;
  phone?: string;
  authType: "anonymous" | "phone";
  createdAt: Date;
}

export interface Staff {
  id: string;
  name: string;
  role: "admin" | "manager" | "staff" | "chef" | "housekeeping" | "spa";
  email?: string;
  phone?: string;
  permissions?: string[];
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  type: "dining" | "spa" | "laundry" | "amenities";
  description?: string;
  isEnabled?: boolean;
  price?: number;               // optional flat price where appropriate
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface OrderItem {
  id: string;                   // menuItemId or serviceId
  name: string;
  quantity: number;
  price: number;
  addons?: { id: string; name: string; price: number }[];
}

export interface Order {
  id: string;
  guestId: string;
  serviceType: "dining" | "spa" | "laundry" | "amenities";
  items?: OrderItem[];          // dining/laundry
  request?: string;             // amenities message
  totalAmount: number;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>; // e.g., spa booking time
}
