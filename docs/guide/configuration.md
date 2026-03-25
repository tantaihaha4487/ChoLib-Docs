# Configuration

## Per-Mod Settings

All configuration methods require your modId:

```java
// Require 15 presses for mymod
ChoLibAPI.setMaxProgress("mymod", 15);

// 4 second window
ChoLibAPI.setWindowTicks("mymod", 80);

// 3 second cooldown
ChoLibAPI.setCooldownTicks("mymod", 60);
```

Reading values:

```java
int presses = ChoLibAPI.getMaxProgress("mymod");
```

## Global Settings

For simple mods that don't need per-mod isolation, global methods work without modId:

```java
ChoLibAPI.setMaxProgress(10);
int presses = ChoLibAPI.getMaxProgress();
```

## Timing in Ticks

Minecraft runs at 20 ticks per second:

| Seconds | Ticks |
|---------|-------|
| 1 | 20 |
| 2 | 40 |
| 3 | 60 |
| 4 | 80 |
| 5 | 100 |

## Custom Progress Bars

By default, ChoLib shows a simple progress bar. You can customize it completely.

```java
ChoLibAPI.setProgressBarProvider("mymod", (player, current, max) -> {
    int pct = (max == 0) ? 0 : (current * 100) / max;
    int filled = pct / 10;

    MutableText bar = Text.literal("【").formatted(Formatting.GREEN);
    for (int i = 0; i < 10; i++) {
        if (i < filled - 1) {
            bar.append(Text.literal("█").formatted(Formatting.GREEN));
        } else if (i == filled - 1) {
            bar.append(Text.literal("█").formatted(Formatting.GREEN));
        } else if (i == filled) {
            bar.append(Text.literal("▓").formatted(Formatting.YELLOW));
        } else if (i == filled + 1) {
            bar.append(Text.literal("▒").formatted(Formatting.GRAY));
        } else {
            bar.append(Text.literal("░").formatted(Formatting.DARK_GRAY));
        }
    }
    bar.append(Text.literal("】 " + pct + "%").formatted(Formatting.WHITE));
    return bar;
});
```

This produces: `【███▓▒░░░░】 30%`

### Default Style

```java
ChoLibAPI.setProgressBarProvider("mymod", (player, current, max) -> {
    int pct = (max == 0) ? 0 : (current * 100) / max;
    int filled = pct / 10;
    int empty = 10 - filled;

    StringBuilder bar = new StringBuilder();
    for (int i = 0; i < filled; i++) bar.append("═");
    for (int i = 0; i < empty; i++) bar.append("─");

    return Text.literal("╞" + bar + "╡ " + pct + "%")
        .formatted(Formatting.GREEN);
});
```

This produces: `╞═══════───╡ 70%`

The provider receives the player, current press count, and max presses. Return any `Text` you want shown on the action bar.

## Default Values

| Setting | Default | Description |
|---------|---------|-------------|
| Max Progress | 10 presses | Shift presses required for activation |
| Window | 60 ticks (3s) | Time window to count presses |
| Cooldown | 40 ticks (2s) | Cooldown after activation |
