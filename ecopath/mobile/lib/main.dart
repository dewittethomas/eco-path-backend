import 'package:flutter/material.dart';
import 'ui/root_shell.dart';
import 'ui/screens/intro_screen.dart';

void main() {
  runApp(const EcoPathRoot());
}

class EcoPathRoot extends StatelessWidget {
  const EcoPathRoot({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'EcoPath',
      theme: ThemeData(useMaterial3: true),
      // Start on the Intro screen
      home: const IntroScreen(),
      // Route into RootShell with an optional initial tab index
      onGenerateRoute: (settings) {
        if (settings.name == '/root') {
          final arg = settings.arguments;
          final int initialIndex = (arg is int) ? arg : 0;
          return MaterialPageRoute(
            builder: (_) => RootShell(initialIndex: initialIndex),
            settings: settings,
          );
        }
        return null;
      },
    );
  }
}
