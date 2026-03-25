# Getting Started

This page covers how to add ChoLib to your Fabric mod project and set up basic shift-activation abilities.

## Requirements

- Minecraft 1.21.11
- Fabric mod loader
- Java 21

## Installation

Add the dependency to your `build.gradle`:

```gradle
dependencies {
    modImplementation "net.thanachot:cholib:1.21.11-1.0.0"
}
```

Your `fabric.mod.json` should include:

```json
{
  "depends": {
    "cholib": "1.21.11-1.0.0"
  }
}
```

## Basic Setup

In your mod's initializer, import the ChoLib API:

```java
import net.thanachot.choLib.api.ChoLibAPI;
import net.thanachot.choLib.api.ShiftHand;
import net.thanachot.choLib.api.ShiftActivationHandler;
```

Register your first shift-activated ability:

```java
public class MyMod implements ModInitializer {
    @Override
    public void onInitialize() {
        ChoLibAPI.registerItem(
            "mymod",
            Items.DIAMOND_SWORD,
            ShiftHand.MAIN_HAND,
            (player, stack, hand) -> {
                Vec3d look = player.getRotationVector();
                player.addVelocity(look.x * 2, 0.3, look.z * 2);
                return ActionResult.SUCCESS;
            }
        );
    }
}
```

When a player holds a diamond sword in their main hand and presses shift 10 times within 3 seconds, the ability triggers.

## How It Works

1. Player holds a registered item
2. Player rapidly presses shift
3. Each press within a 3-second window counts toward progress
4. A progress bar appears on the action bar (e.g., `╞▰════════╡ 50%`)
5. At 10 presses, the ability activates
6. A 2-second cooldown prevents immediate re-activation

## Next Steps

- Learn about [registration methods](/guide/usage) to register items by tag, class, or custom predicates
- Set up [event listeners](/guide/events) to react to activations or add conditions
- [Configure timing](/guide/configuration) to adjust press count, window duration, and cooldown