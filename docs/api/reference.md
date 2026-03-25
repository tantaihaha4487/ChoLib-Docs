# API Reference

## ChoLibAPI

Main entry point for all library operations.

### Registration Methods

```java
void registerItem(String modId, Item item, ShiftHand hand, ShiftActivationHandler handler)
```

Register a single item. Triggers when the exact item is held.

```java
void registerTag(String modId, TagKey<Item> tag, ShiftHand hand, ShiftActivationHandler handler)
```

Register all items in a tag.

```java
void registerItemClass(String modId, Class<? extends Item> itemClass, ShiftHand hand, ShiftActivationHandler handler)
```

Register all instances of a class.

```java
void registerPredicate(String modId, Predicate<ItemStack> predicate, ShiftHand hand, ShiftActivationHandler handler)
```

Register with custom logic.

### Configuration Methods

```java
void setMaxProgress(String modId, int maxProgress)
int getMaxProgress(String modId)
```

Presses required to activate. Default: 10.

```java
void setWindowTicks(String modId, int ticks)
int getWindowTicks(String modId)
```

Time window in ticks. Default: 60 (3 seconds).

```java
void setCooldownTicks(String modId, int ticks)
int getCooldownTicks(String modId)
```

Cooldown in ticks. Default: 40 (2 seconds).

```java
void setProgressBarProvider(String modId, ProgressBarProvider provider)
```

Set a custom progress bar renderer. The provider receives `(ServerPlayerEntity player, int current, int max)` and returns a `Text` to display on the action bar.

```java
@FunctionalInterface
public interface ProgressBarProvider {
    Text provide(ServerPlayerEntity player, int current, int max);
}
```

### State Methods

```java
void deactivate(String modId, UUID playerUuid)
void deactivateAll(String modId)
boolean isActive(String modId, UUID playerUuid)
```

Manually deactivate a player's active sequence.

## ShiftHand

```java
public enum ShiftHand {
    MAIN_HAND,
    OFF_HAND
}
```

## ShiftActivationHandler

```java
@FunctionalInterface
public interface ShiftActivationHandler {
    ActionResult activate(PlayerEntity player, ItemStack stack, Hand hand);
}
```

The handler receives the vanilla `Hand` enum, not `ShiftHand`.

## ShiftDeactivationReason

```java
public enum ShiftDeactivationReason {
    ITEM_SWAP,
    MANUAL,
    CUSTOM
}
```

## Events

### ShiftActivationEvent

```java
ShiftActivationEvent.EVENT.register((player, stack, hand) -> ActionResult)
```

Fires when threshold is reached.

### ShiftDeactivationEvent

```java
ShiftDeactivationEvent.EVENT.register((player, stack, hand, reason) -> ActionResult)
```

Fires when sequence ends.

### ShiftProgressEvent

```java
ShiftProgressEvent.EVENT.register((player, current, max, percentage) -> ActionResult)
```

Fires on each shift press. Percentage is an int (0-100).

### ShiftItemRegisterEvent

```java
ShiftItemRegisterEvent.EVENT.register((registrant, type, hand) -> ActionResult)
```

Fires when item is registered.

## Progress Bar Format

The progress bar displays as: `╞▰════════╡ 50%`

- `╞` and `╡` are the bracket edges
- `═` represents filled segments
- `▰` shows the transition point at current percentage