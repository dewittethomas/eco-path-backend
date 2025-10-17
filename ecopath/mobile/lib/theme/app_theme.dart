import 'package:flutter/material.dart';

class AppTheme {
  // Colors tuned to your screenshot
  static const Color bg = Color(0xFFF6F7F5);          // warm off-white/beige
  static const Color text = Color(0xFF111111);        // dark text
  static const Color muted = Color(0xFFC9D0C9);       // unselected icon/label
  static const Color divider = Color(0xFFE2E5E1);     // top hairline for nav
  static const Color selected = Color(0xFF0F0F0F);    // selected icon/label

  static ThemeData get light {
    final base = ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: bg,
      fontFamily: 'SF Pro Text', // optional – will fall back if not present
      textTheme: const TextTheme(
        bodyMedium: TextStyle(fontSize: 16, color: text),
      ),
      iconTheme: const IconThemeData(size: 26, color: muted),
      appBarTheme: const AppBarTheme(
        elevation: 0,
        backgroundColor: bg,
        foregroundColor: text,
        centerTitle: true,
      ),
      colorScheme: const ColorScheme.light(
        primary: selected,
        surface: bg,
        onSurface: text,
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        type: BottomNavigationBarType.fixed,
        selectedItemColor: selected,
        unselectedItemColor: muted,
        selectedLabelStyle: TextStyle(fontSize: 12),
        unselectedLabelStyle: TextStyle(fontSize: 12),
        showUnselectedLabels: true,
        elevation: 0,
        backgroundColor: bg,
      ),
    );

    return base;
  }
}
