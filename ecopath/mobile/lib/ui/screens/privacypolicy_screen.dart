import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class PrivacyPolicyScreen extends StatelessWidget {
  const PrivacyPolicyScreen({super.key});

  static const Color kInk = Color(0xFF00221C);

  Text _h1(String s) => Text(
        s,
        textAlign: TextAlign.left,
        style: GoogleFonts.lato(
          color: kInk,
          fontSize: 32,
          fontWeight: FontWeight.w700,
        ),
      );

  Widget _p(String s) => Text(
        s,
        textAlign: TextAlign.left,
        style: GoogleFonts.alike(
          color: kInk,
          fontSize: 12,
          fontWeight: FontWeight.w400,
          height: 1.5,
        ),
      );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      body: SafeArea(
        child: Column(
          children: [
            // Top bar with back button
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
              child: Row(
                children: [
                  GestureDetector(
                    onTap: () => Navigator.of(context).pop(),
                    child: SvgPicture.asset(
                      'assets/icons/back.svg', // make sure this path matches your project
                      width: 24,
                      height: 24,
                      semanticsLabel: 'Back',
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      'Privacy Policy',
                      style: GoogleFonts.lato(
                        color: kInk,
                        fontSize: 24,
                        fontWeight: FontWeight.w700,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),

            // Scrollable content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 4, 16, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _h1('1. Introduction'),
                    const SizedBox(height: 8),
                    _p(
                        'EcoPath is committed to protecting your privacy. '
                        'This Privacy Policy explains what data we collect, how we use it, and the choices you have. '
                        'By using EcoPath, you agree to this Policy.'),

                    const SizedBox(height: 20),
                    _h1('2. Information We Collect'),
                    const SizedBox(height: 8),
                    _p(
                        '• Personal Information: such as your name, email address, or profile data (only if you provide them voluntarily).\n'
                        '• App Activity: achievements, points, challenges joined, basic usage analytics.\n'
                        '• Device Data: app version, OS, language, crash diagnostics.\n'
                        '• Optional Inputs: feedback messages, images you upload within features.\n'
                        '• Location (Optional): only if you enable features that require it.'),
                    
                    const SizedBox(height: 20),
                    _h1('3. How We Use Your Information'),
                    const SizedBox(height: 8),
                    _p(
                        '• Provide and maintain core features (profiles, points).\n'
                        '• Improve app performance, safety, and reliability.\n'
                        '•Track and display your environmental progress, challenges, and achievements.\n'
                        '• Personalize non-sensitive content such as streak reminders.\n'
                        '• Communicate important updates, security notices, or policy changes.\n'
                        '• Comply with legal obligations.'),

                    const SizedBox(height: 20),
                    _h1('4. Sharing & Transfers'),
                    const SizedBox(height: 8),
                    _p(
                        'We do not sell your personal data. We may share limited data with service providers who help us operate the app '
                        '(e.g., analytics, crash reporting) under confidentiality agreements. We may disclose information if required by law '
                        'or to protect our rights, users, or the public.'),

                    const SizedBox(height: 20),
                    _h1('5. Data Retention'),
                    const SizedBox(height: 8),
                    _p(
                        'We retain your data for as long as your account is active or as needed to provide services. '
                        'You may request deletion; some records may be kept to meet legal or security requirements.'),

                    const SizedBox(height: 20),
                    _h1('6. Your Choices & Rights'),
                    const SizedBox(height: 8),
                    _p(
                        '• Access & Update: edit profile details in-app.\n'
                        '• Delete: request account deletion from Settings or by contacting us.\n'
                        '• Notifications: toggle reminders and notifications in Settings.\n'
                        '• Permissions: manage device-level permissions (e.g., location, camera).'),

                    const SizedBox(height: 20),
                    _h1('7. Children’s Privacy'),
                    const SizedBox(height: 8),
                    _p(
                        'EcoPath is not directed to children under the age where parental consent is required by local law. '
                        'If we learn that we collected data from such a child without consent, we will delete it.'),

                    const SizedBox(height: 20),
                    _h1('8. Security'),
                    const SizedBox(height: 8),
                    _p(
                        'We use reasonable technical and organizational measures to protect your information. '
                        'However, no method of transmission or storage is completely secure.'),

                    const SizedBox(height: 20),
                    _h1('9. International Use'),
                    const SizedBox(height: 8),
                    _p(
                        'Your information may be processed in countries other than your own. '
                        'We take steps to ensure appropriate safeguards in line with applicable laws.'),

                    const SizedBox(height: 20),
                    _h1('10. Changes to This Policy'),
                    const SizedBox(height: 8),
                    _p(
                        'We may update this Policy from time to time. We will notify you of material changes by in-app notice or other means. '
                        'Your continued use of EcoPath after changes indicates acceptance.'),

                    const SizedBox(height: 20),
                    _h1('11. Contact Us'),
                    const SizedBox(height: 8),
                    _p(
                        'If you have questions or requests about this Policy or your data, please contact our team via the Feedback section in Settings.'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
