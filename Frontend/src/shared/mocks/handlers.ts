import { http, HttpResponse, delay } from "msw";
import type { AdminClubListItem } from "@features/admin/api/clubs";
import type { ApiResponse } from "@shared/model/ApiResponse";
import { env } from "@shared/config/env";

const BASE_URL = env.VITE_API_BASE_URL;

function apiResponse<T>(data: T, overrides?: Partial<ApiResponse<T>>): ApiResponse<T> {
  return {
    success: true,
    message: "Success",
    data,
    statusCode: 200,
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

function apiError(message: string, statusCode: number, error?: ApiResponse<never>["error"]): ApiResponse<never> {
  return {
    success: false,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    error,
  };
}

const adminClubs: AdminClubListItem[] = [
  {
    id: "club_001",
    name: "Dev Collective",
    category: "Technology",
    status: "active" as const,
    memberCount: 412,
    visibility: "Public" as const,
    eventCount: 12,
    manager: "Alex Chen",
    icon: "code",
  },
  {
    id: "club_002",
    name: "Fine Arts Soc",
    category: "Arts",
    status: "pending" as const,
    memberCount: 24,
    visibility: "Private" as const,
    eventCount: 0,
    manager: "Sarah Jenkins",
    icon: "sparkle",
  },
  {
    id: "club_003",
    name: "Retro Gaming",
    category: "Leisure",
    status: "archived" as const,
    memberCount: 156,
    visibility: "Public" as const,
    eventCount: 0,
    manager: "Marcus Thorne",
    icon: "archive",
  },
  {
    id: "club_004",
    name: "Powerlift Club",
    category: "Sports",
    status: "active" as const,
    memberCount: 89,
    visibility: "Public" as const,
    eventCount: 4,
    manager: "Diana Prince",
    icon: "dumbbell",
  },
  {
    id: "club_005",
    name: "Drama Guild",
    category: "Arts",
    status: "active" as const,
    memberCount: 210,
    visibility: "Public" as const,
    eventCount: 8,
    manager: "Leo Banks",
    icon: "theater",
  },
];

const adminClubStats = {
  total: 24,
  pendingReview: 5,
  activeEvents: 18,
  verified: 19,
};

let adminClubSeed = adminClubs.length;

export const handlers = [
  http.get(`${BASE_URL}/health`, () => {
    return HttpResponse.json(apiResponse({ status: "ok" }));
  }),

  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as { email?: string; password?: string };

    if (!body.email || !body.password) {
      return HttpResponse.json(
        apiError("Validation failed", 422, {
          details: {
            email: !body.email ? ["Email is required"] : [],
            password: !body.password ? ["Password is required"] : [],
          },
        }),
        { status: 422 },
      );
    }

    const mockUsers: Record<string, { password: string; token: string; user: { id: string; email: string; name: string; role: string } }> = {
      "admin@university.edu": {
        password: "password123",
        token: "mock-jwt-token-admin",
        user: { id: "usr_001", email: "admin@university.edu", name: "Admin User", role: "UniversityAdmin" },
      },
      "clubadmin@university.edu": {
        password: "password123",
        token: "mock-jwt-token-clubadmin",
        user: { id: "usr_002", email: "clubadmin@university.edu", name: "Club Manager", role: "ClubAdmin" },
      },
      "student@university.edu": {
        password: "password123",
        token: "mock-jwt-token-student",
        user: { id: "usr_003", email: "student@university.edu", name: "Alex Student", role: "Student" },
      },
    };

    const mockUser = mockUsers[body.email!];

    if (mockUser && body.password === mockUser.password) {
      return HttpResponse.json(
        apiResponse({ token: mockUser.token, user: mockUser.user }),
      );
    }

    return HttpResponse.json(
      apiError("Invalid email or password", 401),
      { status: 401 },
    );
  }),

  http.get(`${BASE_URL}/auth/me`, async ({ request }) => {
    await delay(200);

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        apiError("Unauthorized", 401),
        { status: 401 },
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const tokenUserMap: Record<string, { id: string; email: string; name: string; role: string }> = {
      "mock-jwt-token-admin": { id: "usr_001", email: "admin@university.edu", name: "Admin User", role: "UniversityAdmin" },
      "mock-jwt-token-clubadmin": { id: "usr_002", email: "clubadmin@university.edu", name: "Club Manager", role: "ClubAdmin" },
      "mock-jwt-token-student": { id: "usr_003", email: "student@university.edu", name: "Alex Student", role: "Student" },
    };

    const user = tokenUserMap[token];
    if (!user) {
      return HttpResponse.json(
        apiError("Unauthorized", 401),
        { status: 401 },
      );
    }

    return HttpResponse.json(apiResponse(user));
  }),

  http.get(`${BASE_URL}/invitations/verify`, async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token || token === "expired") {
      return HttpResponse.json(
        apiError("This invitation is invalid or has expired.", 400),
        { status: 400 },
      );
    }

    return HttpResponse.json(
      apiResponse({
        email: "student@university.edu",
        universityName: "Tribhuvan University",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      }),
    );
  }),

  http.post(`${BASE_URL}/invitations/accept`, async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as {
      token?: string;
      name?: string;
      password?: string;
    };

    if (!body.token || !body.password) {
      return HttpResponse.json(
        apiError("Validation failed", 422, {
          details: {
            password: !body.password ? ["Password is required"] : [],
          },
        }),
        { status: 422 },
      );
    }

    return HttpResponse.json(
      apiResponse({
        token: "mock-jwt-token-student",
        user: {
          id: "usr_003",
          email: "student@university.edu",
          name: "Student User",
          role: "Student",
        },
      }),
    );
  }),

  http.put(`${BASE_URL}/profile/complete`, async ({ request }) => {
    await delay(500);

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        apiError("Unauthorized", 401),
        { status: 401 },
      );
    }

    const body = (await request.json()) as {
      bio?: string;
      faculty?: string;
      department?: string;
      batch?: string;
      interests?: string[];
      socialLinks?: { platform: string; url: string }[];
    };

    return HttpResponse.json(
      apiResponse({
        id: "usr_002",
        email: "student@university.edu",
        name: "Student User",
        bio: body.bio || "",
        faculty: body.faculty || "",
        department: body.department || "",
        batch: body.batch || "",
        interests: body.interests || [],
        socialLinks: body.socialLinks || [],
        profileCompleted: true,
      }),
    );
  }),

  http.get(`${BASE_URL}/clubs`, async ({ request }) => {
    await delay(400);

    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const category = url.searchParams.get("category")?.toLowerCase() ?? "";

    const allClubs = [
      {
        id: "club_001",
        name: "Coding Club",
        description: "Building the next generation of software engineers through projects and peer learning.",
        category: "Technology",
        privacy: "public" as const,
        memberCount: 1200,
        coverImage: "",
        icon: "code",
      },
      {
        id: "club_002",
        name: "Robotics Guild",
        description: "Designing and competing in international robotics competitions.",
        category: "Robotics",
        privacy: "private" as const,
        memberCount: 450,
        coverImage: "",
        icon: "smart_toy",
      },
      {
        id: "club_003",
        name: "Photography Society",
        description: "Capturing moments and exploring visual storytelling techniques through weekly photowalks.",
        category: "Photography",
        privacy: "public" as const,
        memberCount: 2100,
        coverImage: "",
        icon: "photo_camera",
      },
      {
        id: "club_004",
        name: "AI Research Lab",
        description: "Exploring the frontiers of machine learning and large language models.",
        category: "AI",
        privacy: "private" as const,
        memberCount: 180,
        coverImage: "",
        icon: "psychology",
      },
      {
        id: "club_005",
        name: "Debate Union",
        description: "Sharpening critical thinking and public speaking through competitive debating.",
        category: "Debate",
        privacy: "public" as const,
        memberCount: 720,
        coverImage: "",
        icon: "forum",
      },
      {
        id: "club_006",
        name: "Music Ensemble",
        description: "A collaborative space for instrumentalists and vocalists of all genres.",
        category: "Music",
        privacy: "public" as const,
        memberCount: 890,
        coverImage: "",
        icon: "music_note",
      },
      {
        id: "club_007",
        name: "Esports Club",
        description: "Competitive gaming, tournament organization, and gaming culture.",
        category: "Sports",
        privacy: "public" as const,
        memberCount: 3400,
        coverImage: "",
        icon: "sports_esports",
      },
      {
        id: "club_008",
        name: "Marketing Society",
        description: "Mastering the art of branding, digital marketing, and consumer behavior.",
        category: "Management",
        privacy: "private" as const,
        memberCount: 610,
        coverImage: "",
        icon: "trending_up",
      },
    ];

    let filtered = allClubs;

    if (search) {
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(search) || c.description.toLowerCase().includes(search),
      );
    }

    if (category) {
      filtered = filtered.filter((c) => c.category.toLowerCase() === category);
    }

    return HttpResponse.json(apiResponse(filtered));
  }),

  http.get(`${BASE_URL}/clubs/:clubId`, async ({ params }) => {
    await delay(300);

    const { clubId } = params;

    const clubDetails: Record<string, object> = {
      club_001: {
        id: "club_001",
        name: "Coding Club",
        description: "Building the next generation of software engineers through projects and peer learning.",
        about: "The Coding Club is a premier academic community dedicated to the art and science of software engineering. Our mission is to bridge the gap between theoretical computer science and practical industrial application through collaborative projects and peer-led learning.\n\nWhether you're interested in full-stack development, machine learning, or system architecture, we provide a structured environment to build, break, and scale code. We host weekly technical sessions that dive deep into modern frameworks and algorithmic problem-solving.",
        category: "Technology",
        privacy: "public",
        memberCount: 1200,
        coverImage: "",
        admins: [
          { id: "a1", name: "Alex Chen", role: "Lead Organizer" },
          { id: "a2", name: "Sarah Miller", role: "Technical Lead" },
          { id: "a3", name: "David Park", role: "Events Coordinator" },
        ],
        upcomingEvents: [
          { id: "e1", month: "Oct", day: "24", title: "Winter Hackathon 2024", subtitle: "48-hour build challenge" },
          { id: "e2", month: "Nov", day: "02", title: "Rust Systems Workshop", subtitle: "Intro to memory safety" },
        ],
        stats: [
          { label: "Weekly Commits", value: "452" },
          { label: "Open Projects", value: "12" },
          { label: "Active Mentors", value: "18" },
        ],
      },
    };

    const club = clubDetails[clubId as string] ?? {
      id: clubId,
      name: "Club",
      description: "A student club.",
      about: "This is a student club on Student Hub. Join to connect with other students who share your interests.",
      category: "General",
      privacy: "public",
      memberCount: 50,
      coverImage: "",
      admins: [{ id: "a1", name: "Club Admin", role: "Organizer" }],
      upcomingEvents: [],
      stats: [
        { label: "Members", value: "50" },
        { label: "Posts This Week", value: "3" },
      ],
    };

    return HttpResponse.json(apiResponse(club));
  }),

  http.get(`${BASE_URL}/events`, async () => {
    await delay(400);

    const events = [
      {
        id: "evt_001",
        title: "Winter Hackathon 2024",
        club: { id: "club_001", name: "Coding Club" },
        location: "Main Hall, Building A",
        time: "10:00 AM - 6:00 PM",
        day: "24",
        month: "OCT",
        attendees: 128,
        coverImage: "",
      },
      {
        id: "evt_002",
        title: "Digital Design Expo",
        club: { id: "club_003", name: "Creative Arts Society" },
        location: "Art Gallery, Level 2",
        time: "2:00 PM - 5:00 PM",
        day: "28",
        month: "OCT",
        attendees: 64,
        coverImage: "",
      },
      {
        id: "evt_003",
        title: "Inter-Varsity Debate",
        club: { id: "club_005", name: "Debate League" },
        location: "Lecture Theatre 4",
        time: "5:30 PM - 8:00 PM",
        day: "02",
        month: "NOV",
        attendees: 210,
        coverImage: "",
      },
      {
        id: "evt_004",
        title: "All-Campus Finals",
        club: { id: "club_007", name: "Sports Council" },
        location: "University Sports Center",
        time: "6:00 PM - 9:00 PM",
        day: "05",
        month: "NOV",
        attendees: 450,
        coverImage: "",
      },
      {
        id: "evt_005",
        title: "Freshers Social Mixer",
        club: { id: "club_001", name: "Student Union" },
        location: "Campus Cafeteria",
        time: "7:00 PM - 10:00 PM",
        day: "12",
        month: "NOV",
        attendees: 320,
        coverImage: "",
      },
      {
        id: "evt_006",
        title: "AI Research Symposium",
        club: { id: "club_004", name: "AI Research Lab" },
        location: "Innovation Center, Room 301",
        time: "9:00 AM - 4:00 PM",
        day: "18",
        month: "NOV",
        attendees: 95,
        coverImage: "",
      },
    ];

    return HttpResponse.json(apiResponse(events));
  }),

  http.get(`${BASE_URL}/events/:eventId`, async ({ params }) => {
    await delay(300);

    const { eventId } = params;

    const eventsData: Record<string, object> = {
      evt_001: {
        id: "evt_001",
        title: "Winter Hackathon 2024",
        description:
          "Gear up for the most anticipated coding challenge of the semester! The Winter Hackathon 2024 is a 48-hour intensive building experience where students from all disciplines come together to solve real-world problems using technology.\n\nThis year's theme is \"Sustainable Campus Tech.\" Whether you're a backend wizard, a UX enthusiast, or a creative problem-solver, there's a place for you here. Work in teams of up to 4 to develop innovative prototypes, receive mentorship from industry professionals, and compete for over $5,000 in prizes.",
        highlights: [
          "Networking sessions with top-tier tech recruiters.",
          "Free catering, coffee, and energy drinks throughout the weekend.",
          "Exclusive \"Hackathon 2024\" swag kits for all participants.",
        ],
        club: { id: "club_001", name: "Coding Club" },
        location: "Building A, Level 2",
        address: "123 University Drive, Main Campus",
        date: "2024-10-24",
        day: "24",
        month: "Oct",
        weekday: "Thursday",
        time: "10:00 AM - 6:00 PM",
        capacity: 150,
        registered: 128,
        status: "upcoming",
        organizer: { id: "a1", name: "Alex Chen", role: "Lead Organizer, Coding Club" },
        attendeeCount: 128,
        coverImage: "",
      },
    };

    const event = eventsData[eventId as string] ?? {
      id: eventId,
      title: "Campus Event",
      description: "A campus event organized by Student Hub clubs.",
      highlights: [],
      club: { id: "club_001", name: "Student Hub" },
      location: "Campus Hall",
      address: "University Campus",
      date: "2024-11-01",
      day: "01",
      month: "Nov",
      weekday: "Friday",
      time: "2:00 PM - 5:00 PM",
      capacity: 100,
      registered: 45,
      status: "upcoming",
      organizer: { id: "a1", name: "Event Admin", role: "Organizer" },
      attendeeCount: 45,
      coverImage: "",
    };

    return HttpResponse.json(apiResponse(event));
  }),

  http.get(`${BASE_URL}/admin/students`, async ({ request }) => {
    await delay(400);

    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";

    const allStudents = [
      { id: "s1", name: "Alex Thompson", email: "alex.t@studenthub.edu", studentId: "SH-2023-9941", department: "Computer Science", status: "active" as const, courses: ["CS", "MA", "PH", "EN"] },
      { id: "s2", name: "Sarah Jenkins", email: "s.jenkins@studenthub.edu", studentId: "SH-2023-8822", department: "Design Arts", status: "on_break" as const, courses: ["DE", "AR"] },
      { id: "s3", name: "Marcus Vonn", email: "vonn_m@studenthub.edu", studentId: "SH-2022-7715", department: "Chemical Engineering", status: "active" as const, courses: ["PH", "CH"] },
      { id: "s4", name: "Elena Rodriguez", email: "elena.r@studenthub.edu", studentId: "SH-2023-1102", department: "Business Admin", status: "inactive" as const, courses: ["BA", "MK", "FI", "HR", "EC"] },
      { id: "s5", name: "David Park", email: "david.p@studenthub.edu", studentId: "SH-2023-5567", department: "Computer Science", status: "active" as const, courses: ["CS", "AI"] },
      { id: "s6", name: "Priya Sharma", email: "priya.s@studenthub.edu", studentId: "SH-2023-3341", department: "Medicine", status: "active" as const, courses: ["BIO", "CH", "AN"] },
      { id: "s7", name: "James Wilson", email: "james.w@studenthub.edu", studentId: "SH-2024-0012", department: "Computer Science", status: "invited" as const, courses: [] },
      { id: "s8", name: "Mia Chen", email: "mia.c@studenthub.edu", studentId: "SH-2023-6689", department: "Design Arts", status: "active" as const, courses: ["DE", "UX", "GD"] },
    ];

    let filtered = allStudents;
    if (search) {
      filtered = filtered.filter(
        (s) => s.name.toLowerCase().includes(search) || s.email.toLowerCase().includes(search) || s.studentId.toLowerCase().includes(search),
      );
    }

    return HttpResponse.json(apiResponse(filtered));
  }),

  http.get(`${BASE_URL}/admin/students/stats`, async () => {
    await delay(200);

    return HttpResponse.json(
      apiResponse({
        total: 1284,
        growthRate: "+12.4%",
        departments: [
          { name: "Computer Science", abbreviation: "CS", count: 420, color: "#3B82F6" },
          { name: "Design Arts", abbreviation: "Arts", count: 280, color: "#8B5CF6" },
          { name: "Medicine", abbreviation: "Med", count: 190, color: "#EF4444" },
          { name: "Business Admin", abbreviation: "Biz", count: 394, color: "#10B981" },
        ],
      }),
    );
  }),

  http.post(`${BASE_URL}/admin/students/invite`, async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as { email?: string };

    if (!body.email) {
      return HttpResponse.json(
        apiError("Email is required", 422, { details: { email: ["Email is required"] } }),
        { status: 422 },
      );
    }

    return HttpResponse.json(apiResponse({ id: "s_new_001" }));
  }),

  http.get(`${BASE_URL}/admin/clubs`, async ({ request }) => {
    await delay(350);

    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.toLowerCase() ?? "";
    const category = url.searchParams.get("category")?.toLowerCase() ?? "";
    const status = url.searchParams.get("status")?.toLowerCase() ?? "";

    let filtered = adminClubs;

    if (search) {
      filtered = filtered.filter(
        (club) =>
          club.name.toLowerCase().includes(search) ||
          club.category.toLowerCase().includes(search) ||
          club.manager.toLowerCase().includes(search),
      );
    }

    if (category && category !== "all categories") {
      filtered = filtered.filter((club) => club.category.toLowerCase() === category);
    }

    if (status && status !== "all statuses") {
      filtered = filtered.filter((club) => club.status === status);
    }

    return HttpResponse.json(apiResponse(filtered));
  }),

  http.get(`${BASE_URL}/admin/clubs/stats`, async () => {
    await delay(200);

    return HttpResponse.json(
      apiResponse(adminClubStats),
    );
  }),
  http.post(`${BASE_URL}/admin/clubs`, async ({ request }) => {
    await delay(400);

    const body = (await request.json()) as {
      name?: string;
      category?: string;
      status?: "active" | "pending" | "archived";
      visibility?: "Public" | "Private";
      description?: string;
      manager?: string;
      icon?: string;
    };

    if (!body.name || !body.category || !body.status || !body.visibility || !body.description || !body.manager || !body.icon) {
      return HttpResponse.json(
        apiError("Validation failed", 422, {
          details: {
            name: !body.name ? ["Club name is required"] : [],
            category: !body.category ? ["Category is required"] : [],
            status: !body.status ? ["Status is required"] : [],
            visibility: !body.visibility ? ["Visibility is required"] : [],
            description: !body.description ? ["Description is required"] : [],
            manager: !body.manager ? ["Manager is required"] : [],
            icon: !body.icon ? ["Icon is required"] : [],
          },
        }),
        { status: 422 },
      );
    }

    const created = {
      id: `club_${String(++adminClubSeed).padStart(3, "0")}`,
      name: body.name,
      category: body.category,
      status: body.status,
      memberCount: 0,
      visibility: body.visibility,
      eventCount: 0,
      manager: body.manager,
      icon: body.icon,
    };

    adminClubs.unshift(created);
    adminClubStats.total += 1;
    if (body.status === "pending") {
      adminClubStats.pendingReview += 1;
    }

    return HttpResponse.json(apiResponse(created), { status: 201 });
  }),
];
