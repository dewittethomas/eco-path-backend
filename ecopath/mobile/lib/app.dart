import 'package:flutter/material.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Dashboard'));
}

class Features extends StatelessWidget {
  const Features({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Features'));
}

class Games extends StatelessWidget {
  const Games({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Games'));
}

// Renamed to avoid clashing with the real Profile screen
class ProfileStub extends StatelessWidget {
  const ProfileStub({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Profile stub'));
}

class Notifications extends StatelessWidget {
  const Notifications({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('Notification screen'));
}

class EcoPathApp extends StatefulWidget {
  const EcoPathApp({super.key});
  @override
  State<EcoPathApp> createState() => _EcoPathAppState();
}

class _EcoPathAppState extends State<EcoPathApp> {
  int _selectedIndex = 0;

  final List<Widget> _pages = const [
    Dashboard(),
    Features(),
    Games(),
    Notifications(),
    ProfileStub(),
  ];

  void _onItemTapped(int index) => setState(() => _selectedIndex = index);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.bar_chart_outlined), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.grid_view_outlined), label: 'Features'),
          BottomNavigationBarItem(icon: Icon(Icons.videogame_asset_outlined), label: 'Games'),
          BottomNavigationBarItem(icon: Icon(Icons.notifications_none), label: 'Notification'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Profile'),
        ],
      ),
    );
  }
}
