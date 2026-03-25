# Events

ChoLib fires Fabric events at key moments during the shift-activation process.

## ShiftActivationEvent

Fires when the threshold is reached:

```java
ShiftActivationEvent.EVENT.register((player, stack, hand) -> {
    if (player.hasStatusEffect(StatusEffects.BLINDNESS)) {
        return ActionResult.FAIL;
    }
    return ActionResult.PASS;
});
```

## ShiftDeactivationEvent

Fires when an active sequence ends:

```java
ShiftDeactivationEvent.EVENT.register((player, stack, hand, reason) -> {
    if (reason == ShiftDeactivationReason.ITEM_SWAP) {
        player.removeStatusEffect(StatusEffects.SPEED);
    }
    return ActionResult.PASS;
});
```

Deactivation reasons:

- `ITEM_SWAP` - player switched items
- `MANUAL` - handler or event cancelled activation
- `CUSTOM` - cooldown expired after successful activation

## ShiftProgressEvent

Fires on every shift press:

```java
ShiftProgressEvent.EVENT.register((player, current, max, percentage) -> {
    if (player.isSubmergedInWater() && !player.getAbilities().allowFlying) {
        return ActionResult.FAIL;
    }
    return ActionResult.PASS;
});
```

The callback receives the current press count, max presses needed, and percentage as an integer (0-100).

## ShiftItemRegisterEvent

Fires when an item is registered:

```java
ShiftItemRegisterEvent.EVENT.register((registrant, type, hand) -> {
    return ActionResult.PASS;
});
```

## Event Order

1. `ShiftProgressEvent` - each press, can cancel here
2. `ShiftActivationEvent` - threshold reached, can cancel here
3. Handler runs
4. `ShiftDeactivationEvent` - with `CUSTOM` reason
5. Cooldown begins