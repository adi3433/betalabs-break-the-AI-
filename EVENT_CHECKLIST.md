# ✅ BREAK THE AI - Event Day Checklist

## 📋 Pre-Event Preparation (1 Week Before)

### Technical Setup
- [ ] Install Node.js 18+ on event computer
- [ ] Clone/download project files
- [ ] Run `npm install` to install dependencies
- [ ] Obtain API key (OpenAI/OpenRouter/Together AI)
- [ ] Configure `.env.local` file with API key
- [ ] Test application: `npm run dev`
- [ ] Test all 4 AI personalities
- [ ] Verify Admin Dashboard works
- [ ] Test on mobile devices (if needed)
- [ ] Prepare backup device (optional)

### Content Customization
- [ ] Review and adjust AI final codes (if needed)
- [ ] Test difficulty levels
- [ ] Customize AI prompts (optional)
- [ ] Adjust number of attempts (default: 3)
- [ ] Set difficulty reduction time (default: 10 min)

### Materials Preparation
- [ ] Print event rules (for each team)
- [ ] Create lot selection cards/chits
- [ ] Prepare timers (for 10-min swaps)
- [ ] Print AI personality reference sheets
- [ ] Create backup code submission forms

## 📅 Event Day (Morning Setup)

### 1 Hour Before Event
- [ ] Power on all devices
- [ ] Connect to stable internet/WiFi
- [ ] Start the application: `npm run dev`
- [ ] Verify application loads at `http://localhost:3000`
- [ ] Open Admin Dashboard on organizer device
- [ ] Test with dummy team session
- [ ] Clear all test data from Admin Dashboard
- [ ] Set up projector/screen (if using)
- [ ] Prepare lot box with personality chits
- [ ] Set up team registration area
- [ ] Have backup internet connection ready

### Setup Verification
- [ ] Home page loads correctly
- [ ] Team can enter name and proceed
- [ ] Lot selection works and shows random AI
- [ ] Chat interface loads and AI responds
- [ ] Code submission works correctly
- [ ] Admin Dashboard shows active session
- [ ] Timer counts up correctly
- [ ] All 3 attempts work properly

## 🎮 During Event

### Team Registration
- [ ] Team enters their name
- [ ] Team picks one chit from lot box
- [ ] Record which AI each team received
- [ ] Explain rules clearly:
  - [ ] 2 members interact at a time
  - [ ] Swap allowed after 10 minutes
  - [ ] 3 attempts for final code
  - [ ] No phones/internet/external help
  - [ ] AI personality can't be changed
- [ ] Start their session

### Active Monitoring
- [ ] Keep Admin Dashboard visible
- [ ] Track which teams are in progress
- [ ] Note teams stuck >10 minutes (difficulty auto-reduces)
- [ ] Watch for any technical issues
- [ ] Ensure crowd doesn't give hints
- [ ] Enforce 10-minute swap rule
- [ ] Monitor API rate limits/costs

### When Team Submits Code
- [ ] System automatically checks code
- [ ] If correct: ✅ Success! Record completion time
- [ ] If incorrect: Record attempt, remaining attempts shown
- [ ] After 3 wrong attempts: Session terminates
- [ ] Record final outcome in separate sheet

## 🔧 Troubleshooting Quick Reference

### If Chat Stops Responding
1. Check internet connection
2. Verify API key hasn't expired
3. Check API rate limits
4. Refresh page (session persists)

### If Code Won't Submit
1. Ensure 6 digits entered
2. Check modal is fully open
3. Try refreshing page
4. Use backup submission form

### If Session Data Lost
1. Check browser localStorage
2. Don't use incognito mode
3. Admin Dashboard should still have logs
4. Record manually if needed

## 📊 Post-Session Tasks

### After Each Team Completes
- [ ] Note completion time
- [ ] Record success/failure
- [ ] Record number of attempts used
- [ ] Save conversation log (from Admin Dashboard)
- [ ] Prepare for next team

### End of Event
- [ ] Export all session data
  ```javascript
  // In browser console (F12):
  copy(localStorage.getItem('break_the_ai_sessions'))
  ```
- [ ] Save to file for records
- [ ] Calculate statistics:
  - [ ] Total teams participated
  - [ ] Success rate per AI personality
  - [ ] Average completion time
  - [ ] Most difficult AI personality
- [ ] Back up all data before clearing
- [ ] Optional: Clear all sessions for next event

## 📈 Data Collection Sheet

| Team Name | AI Personality | Start Time | End Time | Success | Attempts Used | Notes |
|-----------|---------------|------------|----------|---------|---------------|-------|
|           |               |            |          |         |               |       |

## 🎯 Success Metrics to Track

- Total teams participated: _____
- Teams that succeeded: _____
- Teams that failed: _____
- Average time to complete: _____
- Most popular strategy: _____
- Hardest AI personality: _____
- Easiest AI personality: _____

## 💡 Tips for Organizers

### Keep Energy High
- Announce when teams are close
- Celebrate successful code breaks
- Keep crowd engaged with commentary
- Play suspenseful music (optional)

### Fair Play
- Watch for teams sharing hints
- Ensure no phone usage
- Verify only 2 members active
- Monitor crowd interference

### Time Management
- Set clear swap intervals
- Give 1-minute warnings
- Track total event time
- Keep to schedule

## 📞 Emergency Contacts

- Tech support: _____________________
- API provider support: _____________________
- Backup organizer: _____________________
- Venue IT support: _____________________

## 🎉 Bonus: Prize Ideas

- Fastest completion time
- Most attempts survived (got close without success)
- Best conversation with AI (most entertaining logs)
- Best team strategy
- Most creative approach

---

## ✨ Final Checks Before Starting

- [ ] All systems operational
- [ ] Backup plan ready
- [ ] Rules explained clearly
- [ ] Teams registered
- [ ] Timer set
- [ ] Admin Dashboard monitoring
- [ ] Crowd ready
- [ ] Let's break some AI! 🚀

**Good luck with your event!**
