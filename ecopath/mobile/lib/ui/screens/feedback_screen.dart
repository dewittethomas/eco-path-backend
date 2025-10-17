import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';

class FeedbackScreen extends StatefulWidget {
  const FeedbackScreen({super.key});

  @override
  State<FeedbackScreen> createState() => _FeedbackScreenState();
}

class _FeedbackScreenState extends State<FeedbackScreen> {
  static const Color kInk = Color(0xFF00221C);
  static const Color kBg = Color(0xFFF5F5F5);

  String query = '';

  TextStyle get _titleStyle =>
      GoogleFonts.lato(color: kInk, fontSize: 32, fontWeight: FontWeight.w700);

  TextStyle get _btnStyle =>
      GoogleFonts.alike(color: kInk, fontSize: 16, fontWeight: FontWeight.w400);

  Widget _pillButton(String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(6),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 18),
        margin: const EdgeInsets.symmetric(horizontal: 34, vertical: 20),
        decoration: BoxDecoration(
          color: kBg,
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: kInk, width: 1),
        ),
        alignment: Alignment.center,
        child: Text(label, style: _btnStyle),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Column(
          children: [
            // Top header with back + search
            Stack(
              clipBehavior: Clip.none,
              children: [
                Container(
                  color: kInk,
                  padding: const EdgeInsets.only(top: 21, bottom: 83),
                  width: double.infinity,
                  child: Column(
                    children: [
                      // ✅ Back icon with dark box and white arrow
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Padding(
                          padding: const EdgeInsets.only(left: 18, bottom: 23),
                          child: GestureDetector(
                            onTap: () => Navigator.of(context).maybePop(),
                            child: Container(
                              width: 44,
                              height: 39,
                              decoration: BoxDecoration(
                                color: const Color(0xFF00221C), // dark green box
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Center(
                                child: SvgPicture.asset(
                                  'assets/icons/back.svg',
                                  width: 20,
                                  height: 20,
                                  colorFilter: const ColorFilter.mode(
                                    Color(0xFFF5F5F5), // white icon
                                    BlendMode.srcIn,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),

                      // Search bar
                      Container(
                        margin: const EdgeInsets.symmetric(horizontal: 48),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 24, vertical: 12),
                        decoration: BoxDecoration(
                          color: kBg,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(right: 13),
                              child: Icon(Icons.search, color: Colors.grey[600]),
                            ),
                            Expanded(
                              child: TextField(
                                onChanged: (v) => setState(() => query = v),
                                style: GoogleFonts.alike(
                                  color: const Color(0xFF878A87),
                                  fontSize: 12,
                                  fontWeight: FontWeight.w400,
                                ),
                                decoration: const InputDecoration(
                                  border: InputBorder.none,
                                  isDense: true,
                                  hintText: 'Search',
                                  contentPadding:
                                      EdgeInsets.symmetric(vertical: 0),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                // Girl image
                Positioned(
                  bottom: -43,
                  right: 0,
                  child: SizedBox(
                    width: 113,
                    height: 130,
                    child: Image.asset(
                      'assets/images/logingirl.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ),
              ],
            ),

            // Content area
            Expanded(
              child: Container(
                width: double.infinity,
                color: kBg,
                child: SingleChildScrollView(
                  padding:
                      const EdgeInsets.only(top: 32, bottom: 32), // scrollable
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 34),
                        child: Text('Feedback', style: _titleStyle),
                      ),
                      const SizedBox(height: 8),

                      _pillButton('App Experience',
                          () => _tap(context, 'App Experience')),
                      _pillButton('Feature Functionality',
                          () => _tap(context, 'Feature Functionality')),
                      _pillButton('Content & Information',
                          () => _tap(context, 'Content & Information')),
                      _pillButton('Performance & Technical Issues',
                          () => _tap(context, 'Performance & Technical Issues')),
                      _pillButton('Suggestions',
                          () => _tap(context, 'Suggestions')),
                      _pillButton('Satisfaction Rating',
                          () => _tap(context, 'Satisfaction Rating')),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _tap(BuildContext ctx, String which) {
    ScaffoldMessenger.of(ctx).showSnackBar(
      SnackBar(content: Text('Pressed: $which')),
    );
  }
}
